/**
 * Cloudflare Worker entry — serves the static Astro site (via the ASSETS binding)
 * and handles the lead form at POST /api/lead.
 *
 * On a valid submission it sends TWO emails via Resend:
 *   1. Owner notification  -> LEAD_TO_EMAIL (Matt), reply-to = the lead's email,
 *      with the uploaded file attached (if any, <= 10MB).
 *   2. Branded auto-reply   -> the lead's email, from no-reply@outbackconstruction.net.
 *
 * Env (Cloudflare dashboard -> Settings -> Variables & Secrets):
 *   RESEND_API_KEY   (secret)   Resend API key. Required to actually send email.
 *   LEAD_TO_EMAIL               Where owner notifications go (Matt's inbox).
 *   LEAD_FROM_EMAIL  (optional) Sender, default "Outback Construction <no-reply@outbackconstruction.net>".
 *   LEAD_BCC_EMAIL   (optional) BCC on the owner notification. Default marketing@bdxomaha.com;
 *                              comma-separate for several; set to "" to disable.
 *   LEAD_WEBHOOK_URL (optional) Also POST the lead JSON here (GrowthOS/Zapier/CRM).
 *   LEAD_WEBHOOK_SECRET (optional) If set, sign the webhook body with HMAC-SHA256
 *                              and send it as `X-BDX-Signature: sha256=<hex>`.
 *
 * TODO[MATT/BUILD]: verify the outbackconstruction.net domain in Resend (SPF/DKIM/
 * DMARC DNS records) so mail from no-reply@ is delivered, then set RESEND_API_KEY +
 * LEAD_TO_EMAIL. Until configured, leads are only logged (visible in Worker logs).
 */
interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  LEAD_BCC_EMAIL?: string;
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
}

interface Attachment {
  filename: string;
  content: string; // base64
}

const jsonResponse = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });

const seeOther = (path: string, request: Request) =>
  new Response(null, { status: 303, headers: { location: new URL(path, request.url).toString() } });

const toE164 = (phone: string) => {
  const d = phone.replace(/\D/g, '');
  return '+1' + (d.length > 10 ? d.slice(-10) : d);
};
const sha256Hex = async (input: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
};
// HMAC-SHA256(body) as hex — the lead-webhook signature (Web Crypto; workerd).
const hmacHex = async (secret: string, body: string) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
};
const arrayBufferToBase64 = (buf: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as unknown as number[]);
  }
  return btoa(binary);
};
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Comma-separated address list -> array (supports multiple to/bcc recipients).
const splitEmails = (s: string | undefined) =>
  (s || '').split(',').map((e) => e.trim()).filter(Boolean);
const BCC_DEFAULT = 'marketing@bdxomaha.com';

const FROM_DEFAULT = 'Outback Construction <no-reply@outbackconstruction.net>';
const PHONE_DISPLAY = '(402) 456-7968';
const PHONE_HREF = 'tel:+14024567968';

interface Lead {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  days: string[];
  times: string[];
  services: string[];
  budget: string;
  message: string;
  hearAbout: string;
  fileName: string | null;
  fileNote: string | null;
  submittedAt: string;
  source: string | null;
  hashedPhone: string;
}

// ---- Email bodies -------------------------------------------------------------

function ownerEmail(lead: Lead): { subject: string; html: string; text: string } {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#666;font-weight:bold;vertical-align:top;white-space:nowrap;">${esc(label)}</td><td style="padding:8px 12px;color:#111;">${esc(value)}</td></tr>`
      : '';
  const list = (arr: string[]) => (arr.length ? arr.join(', ') : '');

  const html = `<!doctype html><html><body style="margin:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;">
      <tr><td style="background:#0d0d0d;padding:20px 24px;">
        <span style="color:#fff;font-size:18px;font-weight:bold;letter-spacing:1px;">OUTBACK CONSTRUCTION</span>
        <span style="color:#ce0202;font-weight:bold;"> · New lead</span>
      </td></tr>
      <tr><td style="padding:24px;">
        <h1 style="margin:0 0 4px;font-size:20px;color:#111;">${esc(lead.name)}</h1>
        <p style="margin:0 0 16px;color:#666;font-size:13px;">Submitted ${esc(lead.submittedAt)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
          ${row('Phone', lead.phone)}
          ${row('Email', lead.email)}
          ${row('Address', [lead.address, lead.city].filter(Boolean).join(', '))}
          ${row('Services', list(lead.services))}
          ${row('Budget', lead.budget)}
          ${row('Best days', list(lead.days))}
          ${row('Best times', list(lead.times))}
          ${row('Heard via', lead.hearAbout)}
          ${row('Attachment', lead.fileName || lead.fileNote || '')}
        </table>
        ${lead.message ? `<div style="margin-top:16px;padding:16px;background:#f7f7f7;border-left:3px solid #ce0202;border-radius:4px;"><p style="margin:0;color:#333;font-size:14px;white-space:pre-wrap;">${esc(lead.message)}</p></div>` : ''}
        <p style="margin:20px 0 0;"><a href="${PHONE_HREF}" style="background:#ce0202;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-weight:bold;font-size:14px;">Call ${esc(lead.name.split(' ')[0])}</a></p>
        <p style="margin:12px 0 0;color:#999;font-size:12px;">Reply to this email to respond to the customer directly.</p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;

  const text = [
    `NEW LEAD — ${lead.name}`,
    `Submitted: ${lead.submittedAt}`,
    ``,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    lead.address || lead.city ? `Address: ${[lead.address, lead.city].filter(Boolean).join(', ')}` : '',
    `Services: ${list(lead.services)}`,
    lead.budget ? `Budget: ${lead.budget}` : '',
    lead.days.length ? `Best days: ${list(lead.days)}` : '',
    lead.times.length ? `Best times: ${list(lead.times)}` : '',
    lead.hearAbout ? `Heard via: ${lead.hearAbout}` : '',
    lead.fileName ? `Attachment: ${lead.fileName}` : lead.fileNote ? `Attachment: ${lead.fileNote}` : '',
    ``,
    lead.message ? `Project:\n${lead.message}` : '',
    ``,
    `(Reply to this email to respond to the customer directly.)`,
  ]
    .filter((l) => l !== '')
    .join('\n');

  return { subject: `New lead: ${lead.name} — ${list(lead.services) || 'marine construction'}`, html, text };
}

function autoReplyEmail(name: string): { subject: string; html: string; text: string } {
  const first = esc(name.split(' ')[0] || 'there');
  const html = `<!doctype html><html><body style="margin:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;">
      <tr><td style="background:#0d0d0d;padding:22px 28px;text-align:center;">
        <span style="color:#fff;font-size:20px;font-weight:bold;letter-spacing:1px;">OUTBACK CONSTRUCTION</span>
        <div style="color:#ce0202;font-size:11px;font-weight:bold;letter-spacing:2px;margin-top:4px;">MARINE CONSTRUCTION · SINCE 1998</div>
      </td></tr>
      <tr><td style="height:4px;background:#ce0202;font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:32px 28px;">
        <h1 style="margin:0 0 12px;font-size:22px;color:#111;">Thanks, ${first} — we've got it.</h1>
        <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">
          Your request just landed with Matt. You'll hear back from him personally — usually fast —
          with an honest read on your shoreline: what needs attention now, what can wait, and what it
          takes to do the job right.
        </p>
        <p style="margin:0 0 24px;color:#444;font-size:15px;line-height:1.6;">
          If it's urgent — storm damage or a wall actively moving — don't wait on email. Call Matt directly.
        </p>
        <p style="margin:0 0 28px;">
          <a href="${PHONE_HREF}" style="background:#ce0202;color:#fff;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:bold;font-size:15px;">Call Matt: ${PHONE_DISPLAY}</a>
        </p>
        <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">
          — The Outback Construction crew<br>
          Owner-operated marine construction · Colon, NE
        </p>
      </td></tr>
      <tr><td style="background:#f7f7f7;padding:16px 28px;border-top:1px solid #eee;">
        <p style="margin:0;color:#999;font-size:12px;line-height:1.5;">
          Boat docks · Seawalls · Retaining walls · Barge work · Beach reclamation<br>
          This is an automated confirmation from an unmonitored address — but a real reply from Matt is on the way.
        </p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;

  const text = [
    `Thanks, ${name.split(' ')[0] || 'there'} — we've got it.`,
    ``,
    `Your request just landed with Matt. You'll hear back from him personally — usually fast — with an honest read on your shoreline: what needs attention now, what can wait, and what it takes to do the job right.`,
    ``,
    `If it's urgent (storm damage or a wall actively moving), don't wait on email — call Matt directly: ${PHONE_DISPLAY}.`,
    ``,
    `— The Outback Construction crew`,
    `Owner-operated marine construction · Colon, NE`,
    ``,
    `(Automated confirmation from an unmonitored address — a real reply from Matt is on the way.)`,
  ].join('\n');

  return { subject: `We got your request — Outback Construction`, html, text };
}

async function sendViaResend(env: Env, payload: Record<string, unknown>): Promise<boolean> {
  if (!env.RESEND_API_KEY) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) console.error('Resend error', res.status, await res.text());
  return res.ok;
}

// ---- Lead handler -------------------------------------------------------------

async function handleLead(request: Request, env: Env): Promise<Response> {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return wantsJson ? jsonResponse({ ok: false, error: 'bad_request' }, 400) : seeOther('/contact?error=1', request);
  }

  // Honeypot: bots fill this hidden field. Silently accept, then drop.
  if (form.get('company')) {
    return wantsJson ? jsonResponse({ ok: true }) : seeOther('/thank-you', request);
  }

  const g = (k: string) => String(form.get(k) || '').trim();
  const getAll = (k: string) => form.getAll(k).map((v) => String(v).trim()).filter(Boolean);

  const name = g('name');
  const phone = g('phone');
  const email = g('email');
  const services = getAll('services');
  const agree = !!form.get('agree');

  const errors: string[] = [];
  if (name.length < 2) errors.push('name');
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('email');
  if (phone.replace(/\D/g, '').length < 10) errors.push('phone');
  if (services.length < 1) errors.push('services');
  if (!agree) errors.push('agree');
  if (errors.length) {
    return wantsJson ? jsonResponse({ ok: false, errors }, 400) : seeOther('/contact?error=1', request);
  }

  // Optional file upload -> attach to the owner email (cap 10MB).
  let attachment: Attachment | null = null;
  let fileName: string | null = null;
  let fileNote: string | null = null;
  const file = form.get('file');
  if (file && typeof file !== 'string' && file.size > 0) {
    if (file.size <= 10 * 1024 * 1024) {
      attachment = { filename: file.name || 'upload', content: arrayBufferToBase64(await file.arrayBuffer()) };
      fileName = file.name || 'upload';
    } else {
      fileNote = `${file.name || 'file'} (${Math.round(file.size / 1024 / 1024)}MB — too large to attach; ask the customer to send it)`;
    }
  }

  const lead: Lead = {
    name,
    phone,
    email,
    address: g('address'),
    city: g('city'),
    days: getAll('days'),
    times: getAll('times'),
    services,
    budget: g('budget'),
    message: g('message'),
    hearAbout: g('hearAbout'),
    fileName,
    fileNote,
    submittedAt: new Date().toISOString(),
    source: request.headers.get('referer') || null,
    hashedPhone: await sha256Hex(toE164(phone)),
  };

  let delivered = false;
  try {
    // 1) Owner notification (with attachment + reply-to the customer, BCC marketing)
    const toList = splitEmails(env.LEAD_TO_EMAIL);
    const bccList = splitEmails(env.LEAD_BCC_EMAIL !== undefined ? env.LEAD_BCC_EMAIL : BCC_DEFAULT);
    if (env.RESEND_API_KEY && toList.length) {
      const o = ownerEmail(lead);
      const ownerPayload: Record<string, unknown> = {
        from: env.LEAD_FROM_EMAIL || FROM_DEFAULT,
        to: toList,
        reply_to: email,
        subject: o.subject,
        html: o.html,
        text: o.text,
      };
      if (bccList.length) ownerPayload.bcc = bccList;
      if (attachment) ownerPayload.attachments = [attachment];
      delivered = (await sendViaResend(env, ownerPayload)) || delivered;

      // 2) Branded auto-reply to the lead
      const r = autoReplyEmail(name);
      await sendViaResend(env, {
        from: env.LEAD_FROM_EMAIL || FROM_DEFAULT,
        to: email,
        subject: r.subject,
        html: r.html,
        text: r.text,
      });
    }

    // Optional: mirror the lead to a webhook (GrowthOS lead machine / CRM / Zapier).
    // When a secret is set, sign the exact body so the receiver can verify it.
    if (env.LEAD_WEBHOOK_URL) {
      const body = JSON.stringify(lead);
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      if (env.LEAD_WEBHOOK_SECRET) {
        headers['x-bdx-signature'] = 'sha256=' + (await hmacHex(env.LEAD_WEBHOOK_SECRET, body));
      }
      await fetch(env.LEAD_WEBHOOK_URL, { method: 'POST', headers, body });
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

// 301 redirects from the previous Squarespace site's indexed URLs → the new
// /services/* structure, so ranking/backlink equity carries over. Keys are
// matched case-insensitively with any trailing slash stripped.
const LEGACY_REDIRECTS: Record<string, string> = {
  // Old WordPress page slugs (Search Console still has these indexed).
  '/contact-us': '/contact',
  '/about-us': '/about',
  '/seawall-construction': '/services/seawalls',
  '/beach-reclamation': '/services/beach-reclamation',
  '/retaining-walls-omaha-ne': '/services/retaining-walls',
  '/docks': '/services/boat-docks',
  '/lake-dock-building-and-repair-services-in-omaha-ne': '/services/boat-docks',
  '/residential-boat-docks': '/services/boat-docks',
  '/barge-work': '/services/barge-work',
  '/park-and-commercial-lake-services': '/services',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Legacy URL → new URL 301s (preserve SEO from the old site).
    const normalized = url.pathname.replace(/\/+$/, '').toLowerCase() || '/';
    const redirectTo = LEGACY_REDIRECTS[normalized];
    if (redirectTo) {
      return Response.redirect(new URL(redirectTo, url.origin).toString(), 301);
    }

    if (url.pathname === '/api/lead') {
      if (request.method === 'POST') return handleLead(request, env);
      return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
    }
    return env.ASSETS.fetch(request);
  },
};
