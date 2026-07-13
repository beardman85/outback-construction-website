/**
 * Cloudflare Worker entry — serves the static Astro site (via the ASSETS binding)
 * and handles the lead form endpoint at POST /api/lead.
 *
 * Deploy model: Workers + Static Assets (wrangler.jsonc). Static files are served
 * first; any request that doesn't match a file invokes this Worker. So `/api/lead`
 * runs here, and everything else falls through to env.ASSETS (which also serves the
 * branded 404 page via `not_found_handling: "404-page"`).
 *
 * Lead delivery is env-driven (set in the Cloudflare dashboard → Settings → Variables):
 *   LEAD_WEBHOOK_URL  — optional: POST the lead JSON here (Zapier/Make/Slack/etc.)
 *   RESEND_API_KEY    — optional: send an email via Resend
 *   LEAD_TO_EMAIL     — where lead emails go (e.g. hello@outbackconstruction.net)
 *   LEAD_FROM_EMAIL   — verified sender (e.g. leads@outbackconstruction.net)
 * TODO[MATT/BUILD]: set at least one delivery method before launch. Until then
 * leads are only logged (visible in the Worker logs).
 */
interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  LEAD_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
}

const jsonResponse = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });

const seeOther = (path: string, request: Request) =>
  new Response(null, { status: 303, headers: { location: new URL(path, request.url).toString() } });

// Normalize a US phone to E.164 (+1XXXXXXXXXX) for GA4 Enhanced Conversions.
const toE164 = (phone: string) => {
  const d = phone.replace(/\D/g, '');
  return '+1' + (d.length > 10 ? d.slice(-10) : d);
};
const sha256Hex = async (input: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
};

async function handleLead(request: Request, env: Env): Promise<Response> {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');

  let data: Record<string, string> = {};
  const contentType = request.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      data = (await request.json()) as Record<string, string>;
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) data[k] = String(v);
    }
  } catch {
    return wantsJson ? jsonResponse({ ok: false, error: 'bad_request' }, 400) : seeOther('/contact?error=1', request);
  }

  // Honeypot: bots fill this hidden field. Silently accept, then drop.
  if (data.company) {
    return wantsJson ? jsonResponse({ ok: true }) : seeOther('/thank-you', request);
  }

  const name = (data.name || '').trim();
  const phone = (data.phone || '').trim();
  const message = (data.message || '').trim();
  const lake = (data.lake || '').trim();

  const errors: string[] = [];
  if (name.length < 2) errors.push('name');
  if (phone.replace(/\D/g, '').length < 10) errors.push('phone');
  if (message.length < 5) errors.push('message');
  if (errors.length) {
    return wantsJson ? jsonResponse({ ok: false, errors }, 400) : seeOther('/contact?error=1', request);
  }

  const lead = {
    name,
    phone,
    message,
    lake: lake || null,
    hashedPhone: await sha256Hex(toE164(phone)),
    submittedAt: new Date().toISOString(),
    source: request.headers.get('referer') || null,
  };

  let delivered = false;
  try {
    if (env.LEAD_WEBHOOK_URL) {
      await fetch(env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(lead),
      });
      delivered = true;
    }
    if (env.RESEND_API_KEY && env.LEAD_TO_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL || 'leads@outbackconstruction.net',
          to: env.LEAD_TO_EMAIL,
          subject: `New shoreline assessment request — ${name}`,
          text: `Name: ${name}\nPhone: ${phone}\nLake/community: ${lake || '—'}\n\n${message}\n\nSubmitted: ${lead.submittedAt}\nSource: ${lead.source || '—'}`,
        }),
      });
      delivered = true;
    }
  } catch (err) {
    console.error('Lead delivery error:', err);
  }

  if (!delivered) {
    console.log('LEAD (no delivery configured):', JSON.stringify(lead));
  }

  return wantsJson ? jsonResponse({ ok: true }) : seeOther('/thank-you', request);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/lead') {
      if (request.method === 'POST') return handleLead(request, env);
      return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
    }
    // Everything else: serve the static site (and the 404 page for misses).
    return env.ASSETS.fetch(request);
  },
};
