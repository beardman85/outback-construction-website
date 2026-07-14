/**
 * Full service-page copy — VERBATIM from content.md. Do not rewrite.
 * [MATT:] items from content.md are represented as `todo` blocks / faq.todo and
 * render as visible TODO comments in the built markup (see [service].astro).
 * Paragraph and list-item strings may contain inline HTML (rendered with set:html).
 */
export interface FaqItem {
  q: string;
  a: string;
  todo?: string;
}
export interface RelatedLink {
  text: string;
  href: string;
}
export type Block =
  | { type: 'prose'; heading?: string; paragraphs: string[] }
  | { type: 'list'; heading?: string; intro?: string; ordered?: boolean; items: string[]; after?: string }
  | { type: 'todo'; note: string };

export interface ServiceContent {
  intro: string[];
  sections: Block[];
  faqs: FaqItem[];
  related: RelatedLink[];
  ctaHeading: string;
}

export const serviceContent: Record<string, ServiceContent> = {
  seawalls: {
    intro: [
      `Your seawall is the line between the lake and everything you've built above it — the lawn, the landscaping, the patio, the foundation. When it's sound, you never think about it. When it starts to fail, every storm becomes a question mark.`,
      `Outback Construction has been building and repairing seawalls on Southeast Nebraska lakes since 1998. We know what these walls are up against: ice heave in February, boat wake all summer, saturated sandy soils, and spring water levels that can swing by feet. We build for those conditions — not for the brochure.`,
    ],
    sections: [
      {
        type: 'list',
        heading: `Signs your seawall needs attention`,
        items: [
          `Visible leaning, bowing, or sections out of alignment`,
          `Cracks, spalling concrete, or rusted exposed steel`,
          `Soil washing out behind the wall, or sinkholes forming in the lawn above it`,
          `Gaps opening where wall panels meet`,
          `The beach or lakebed scouring out at the base of the wall`,
        ],
        after: `Caught early, many of these are repairs. Ignored, they become full replacements — usually after a storm forces the issue. If you're seeing any of them, it's worth a look. <a href="/contact" class="font-semibold text-red-600 underline hover:text-red-700">Get a shoreline assessment</a> and we'll tell you honestly which side of that line you're on.`,
      },
      {
        type: 'prose',
        heading: `New seawall construction`,
        paragraphs: [
          `Every lake, lot, and water depth is different, so we start with the site: soil, exposure, wave energy, ice conditions, and how you use your shoreline. Then we recommend the wall system and materials that fit — built to handle Nebraska freeze-thaw cycles, with proper anchoring and drainage so water pressure behind the wall never gets the chance to do what it does to cheap walls.`,
        ],
      },
      { type: 'todo', note: `list the wall systems/materials you install — e.g. steel sheet pile, vinyl, concrete, rip-rap — and typical projects for each` },
      {
        type: 'prose',
        heading: `Seawall repair & storm damage`,
        paragraphs: [
          `Not every failing wall needs replacement. Where the structure is sound, targeted repair can add years of life — and we'll tell you plainly when that's the case. One homeowner's storm-damaged wall was repaired in a single day, with no damage to sprinkler lines and minimal impact on the lawn. That's the standard: fix the wall, respect the property.`,
          `After major storms and high-water years, we prioritize damage assessments for lakefront homeowners. If something looks wrong after a storm, call before the next one.`,
        ],
      },
      {
        type: 'prose',
        heading: `What it's like to work with Outback`,
        paragraphs: [
          `You call, Matt answers. He walks the shoreline with you, explains what he sees, and gives you a straight recommendation — including "this can wait" when that's the truth. Work is scheduled clearly, the crew shows up when promised, and the site is left clean. We've done it this way since 1998, and it's why our reviews say things like "returned all calls in an extremely quick fashion" and "completed the work as promised."`,
        ],
      },
    ],
    faqs: [
      { q: `How long does a seawall last on a Nebraska lake?`, a: `It depends on the system, the materials, and the exposure — but the difference between a wall that lasts 15 years and one that lasts 40 is almost always drainage, anchoring, and build quality. That's where we don't cut corners.` },
      { q: `Can you repair just a section of my seawall?`, a: `Often, yes. If the rest of the structure is sound, sectional repair is a legitimate fix, not a band-aid — and it's a fraction of replacement cost. We'll tell you honestly if your wall is a candidate.` },
      { q: `When is the best time of year for seawall work?`, a: `We work most of the year. Late fall and winter can actually be excellent for some projects — water levels are lower and lawns are dormant, which means less impact on your property. Spring books up fast after ice-out, so if you know work is coming, call early.` },
      { q: `Do I need permits for seawall work?`, a: `Usually, depending on your lake and jurisdiction — and requirements vary between private lake associations, municipalities, and regulatory agencies. We handle marine projects across Southeast Nebraska and will walk you through what applies to your property.`, todo: `confirm how you want to describe permit handling` },
      { q: `What does a new seawall cost?`, a: `Honestly: it depends on length, water depth, soil, access, and the wall system. Anyone who quotes you a price without seeing the site is guessing. The assessment is how we give you a real number — and it costs you nothing but a walk down to the water.` },
    ],
    related: [
      { text: `Protecting a beach behind your wall?`, href: `/services/beach-reclamation` },
      { text: `Wall further up the bank?`, href: `/services/retaining-walls` },
      { text: `Water-access-only site?`, href: `/services/barge-work` },
    ],
    ctaHeading: `Your seawall protects everything above it. Let's make sure it can.`,
  },

  'boat-docks': {
    intro: [
      `The dock is where lake life actually happens — where the boat lives, where the kids jump in, where the evening ends. It's also a structure that takes a beating: sun, waves, ice, and a few thousand landings a season. A dock built right disappears into the background of your summers. A dock built wrong is a repair bill with a diving board.`,
      `Outback has built and repaired docks on Southeast Nebraska lakes since 1998 — for wake boats, pontoons, fishing boats, and everything that ties up next to them.`,
    ],
    sections: [
      {
        type: 'prose',
        heading: `Custom dock construction`,
        paragraphs: [
          `We design around how your family uses the water: slip count and sizes, boat lifts, jet ski ports, swim ladders, seating, storage. Then we build for the site — water depth, lakebed, exposure, and ice conditions. Premium decking and hardware, because on the water, the cheap version costs more within five years.`,
        ],
      },
      { type: 'todo', note: `list dock types/configurations you build — fixed, floating, materials, lift brands you install or work around` },
      {
        type: 'prose',
        heading: `Dock repair & rebuilds`,
        paragraphs: [
          `Rotted decking, failing pilings, storm and ice damage, a frame that's outlived its surface — often the bones are good and a rebuild beats replacement. We'll assess what you have and give you the honest math. One recent customer put it simply: "The Team at Outback did a great job... on time and professional."`,
        ],
      },
    ],
    faqs: [
      { q: `Can you repair my existing dock or does it need replacing?`, a: `If the structure is sound, repair or partial rebuild is usually the smart money. We'll tell you which is which — we have no interest in selling you a dock you don't need.` },
      { q: `What about ice damage in winter?`, a: `Ice is the hidden dock-killer on Nebraska lakes. Design, placement, and (for some docks) seasonal strategy all factor in. Ask us during the assessment — it's a conversation worth having before February, not after.` },
      { q: `How long does a new dock take?`, a: `Most docks are built in days, not weeks, once materials and any approvals are in hand. Spring is the busy season — winter planning gets you on the water sooner.` },
      { q: `Do you work with boat lifts?`, a: `Yes — dock projects are planned around lifts, ports, and how you load and launch.`, todo: `confirm specifics — install lifts? partner with a supplier?` },
    ],
    related: [
      { text: `Shoreline eroding around your dock?`, href: `/services/seawalls` },
      { text: `Want sand where the kids swim?`, href: `/services/beach-reclamation` },
    ],
    ctaHeading: `One dock, built right, decades of summers.`,
  },

  'retaining-walls': {
    intro: [
      `A retaining wall has one job: hold back thousands of pounds of earth, saturated by every rain, frozen and thawed dozens of times a year — and never move. On waterfront properties the stakes are higher, because behind that wall is your yard, and above it is often your home.`,
      `"The wall is leaning" is one of the most common calls we get. Here's what we tell people: a leaning wall is not a cosmetic problem. It's a wall that has already started to fail, and the timeline from lean to collapse is set by weather you can't control.`,
    ],
    sections: [
      {
        type: 'prose',
        heading: `Why waterfront retaining walls fail`,
        paragraphs: [
          `Almost always: water. Poor drainage lets hydrostatic pressure build behind the wall until something gives. Add Nebraska's freeze-thaw cycles, sandy soils, and spring saturation, and an under-built wall doesn't stand a chance. That's why every wall we build is engineered backwards from drainage — footing, backfill, weep systems, and anchoring matched to the load.`,
        ],
      },
      {
        type: 'prose',
        heading: `New construction, replacement & repair`,
        paragraphs: [
          `We build new waterfront retaining walls, replace failed ones, and — where the structure allows — repair and reinforce walls that are showing early movement. The earlier you call about a lean, the more options (and the smaller the bill).`,
        ],
      },
      { type: 'todo', note: `wall systems/materials you build — block, boulder, sheet pile, timber, concrete` },
    ],
    faqs: [
      { q: `My wall is leaning. How urgent is this?`, a: `Worth a professional look now, not next year. Some leans are stable for a while; others are one wet spring from letting go. The assessment tells you which you have — and if it can wait, we'll say so.` },
      { q: `Can a leaning wall be repaired, or does it have to be replaced?`, a: `Depends on cause and construction. Early-stage movement can sometimes be corrected with drainage fixes and reinforcement. Walls that were built without proper footing or drainage usually can't be saved — rebuilding them right is the fix.` },
      { q: `Will a new retaining wall increase my property value?`, a: `A failing wall absolutely decreases it — it's one of the first things inspectors and buyers flag on waterfront property. A well-built wall protects the value you already have and reads as quality the moment someone sees the lot.` },
    ],
    related: [
      { text: `Wall at the waterline? That's a seawall`, href: `/services/seawalls` },
      { text: `Erosion at the beach itself?`, href: `/services/beach-reclamation` },
    ],
    ctaHeading: `If your wall is moving, the clock is running.`,
  },

  'barge-work': {
    intro: [
      `Some waterfront projects simply can't be reached from shore — the lot's too tight, the bank's too steep, or the work itself is out on the water. That's what the barge is for. Outback runs barge-mounted equipment on Southeast Nebraska lakes for the projects that need machinery on the water: dredging, heavy material placement, seawall and dock work on water-access sites, and shoreline projects where protecting the landscaping matters as much as the work itself.`,
      `This is a capability very few contractors in the region have — and it's often the difference between "can't be done" and done.`,
    ],
    sections: [
      {
        type: 'list',
        heading: `What we do from the water`,
        items: [
          `Dredging around docks, lifts, and swim areas (one customer: "great job dredging my floating shore station... on time and professional")`,
          `Rip-rap and boulder placement for shoreline protection`,
          `Seawall construction and repair on water-access-only frontage`,
          `Material delivery — sand, rock, fill — placed exactly where it's needed without driving across your lawn`,
          `Support for dock, lift, and beach projects`,
        ],
      },
      { type: 'todo', note: `confirm equipment specifics and any additional barge services — pile driving? demolition/removal?` },
    ],
    faqs: [
      { q: `My lot has no equipment access. Can you still do the work?`, a: `That's exactly the problem barge work solves. If we can float to it, we can usually build it.` },
      { q: `Is my dock slip getting shallower every year?`, a: `Sandpit lakes move sand — it's what they do. Dredging restores depth around docks and lifts so you're not trimming the motor up in July.` },
      { q: `Will barge work tear up my shoreline?`, a: `The opposite — it's often the way to avoid tearing up your property. Working from the water means no excavators across the lawn and no rutted-out landscaping.` },
    ],
    related: [
      { text: `Shoreline protection from the water`, href: `/services/seawalls` },
      { text: `Rebuilding a beach`, href: `/services/beach-reclamation` },
    ],
    ctaHeading: `Hard-to-reach project? Let's look at it from the water.`,
  },

  'beach-reclamation': {
    intro: [
      `Nebraska's sandpit lakes are always moving sand — wave action, boat wake, ice, and spring high water pull a little more of your beach into the lake every year. One season it's a great beach. A few years later it's a strip of mud and rip-rap, and the grandkids are swimming somewhere else.`,
      `Beach reclamation rebuilds what the lake took: clean sand, brought in and graded for the way you use the water, with the erosion control to keep it from washing out again. One customer said it best after we finished her project: "I don't even want to walk on my beach, it looks so pretty."`,
    ],
    sections: [
      {
        type: 'prose',
        heading: `More than dumping sand`,
        paragraphs: [
          `A truckload of sand on an eroding shoreline is a rental, not a beach. Reclamation done right starts with why the beach eroded — exposure, wake, grade, runoff — and pairs new sand with the fix: proper grading, containment, and where needed, shoreline protection at the edges. That's the difference between redoing the beach every few years and enjoying it every summer.`,
        ],
      },
      {
        type: 'list',
        heading: `How it works`,
        ordered: true,
        items: [
          `<strong>Assessment</strong> — we look at your shoreline, the erosion pattern, and what you want the beach to be (swim beach, entertaining space, kid zone, all three).`,
          `<strong>Plan</strong> — sand quantity and type, final grade, containment, and any protection work, with a clear price.`,
          `<strong>Build</strong> — material placed by land or barge depending on access, graded, finished, and cleaned up.`,
        ],
      },
    ],
    faqs: [
      { q: `How much sand does a beach need?`, a: `Depends on frontage, depth of the beach area, and grade. After an assessment we quote exact quantities — no vague "truckloads" pricing.` },
      { q: `Will the new beach just wash away?`, a: `Not if the cause of the original erosion is addressed. That's why reclamation and shoreline protection are designed together. Where wave energy is high, we'll tell you what it takes to make the beach permanent — and what happens if you skip it.` },
      { q: `When's the best time to rebuild a beach?`, a: `Late summer through fall is ideal — water is typically lower and the beach is ready for the next season. Spring works too but books quickly.` },
    ],
    related: [
      { text: `Protect the new beach`, href: `/services/seawalls` },
      { text: `Water-access delivery`, href: `/services/barge-work` },
      { text: `Dock at the beach`, href: `/services/boat-docks` },
    ],
    ctaHeading: `Summer's short. Make the beach worth it.`,
  },
};
