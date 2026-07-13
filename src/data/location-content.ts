/**
 * Location-page copy — VERBATIM from content.md. Do not rewrite.
 * Inline [MATT:] name-gaps from content.md become inline `<!-- TODO[MATT] -->`
 * HTML comments (invisible to users, visible in source); the surrounding
 * sentence is phrased cleanly around the missing insert until Matt fills it.
 * Service links are woven in exactly where content.md wove them.
 *
 * metaDescription is authored net-new (content.md gave location meta TITLES only,
 * but the spec requires a unique description per page). Factual, from approved facts.
 * TODO[MATT]: review location meta descriptions before launch.
 */
export interface LocationContent {
  metaDescription: string;
  paragraphs: string[];
  mapQuery: string;
  neighbors: string[];
  localFaqTodo: string;
}

export const locationContent: Record<string, LocationContent> = {
  omaha: {
    metaDescription: `Marine construction contractor serving Omaha's lakefront properties — boat docks, seawalls, retaining walls, barge work & beach reclamation. Owner-operated since 1999.`,
    mapQuery: `Omaha, NE`,
    neighbors: ['bennington', 'springfield'],
    localFaqTodo: `3–5 Omaha-specific questions`,
    paragraphs: [
      `Omaha's lakefront properties are spread across the metro — private lake communities, sandpit lakes on the city's west and south edges, and acreage properties with their own water.<!-- TODO[MATT]: name the Omaha-metro communities/lakes you serve --> What they share: owners who've invested heavily in their waterfront and need a contractor who specializes in it.`,
      `That specialization is the whole company. Docks, seawalls, retaining walls, barge work, and beach reclamation — marine construction is all Outback has done since 1999. Omaha homeowners typically find us after the general contractor says "we don't really do water" — or after the cheap fix from a few years ago starts leaning.`,
    ],
  },
  valley: {
    metaDescription: `Boat docks, seawalls, retaining walls & beach reclamation for Valley, NE sandpit-lake communities. Owner-operated marine construction since 1999.`,
    mapQuery: `Valley, NE`,
    neighbors: ['waterloo', 'fremont'],
    localFaqTodo: `3–5 Valley-specific questions — HOA/lake association approval processes, common wall types in these communities, wake boat traffic`,
    paragraphs: [
      `Valley sits at the heart of Nebraska sandpit-lake country. The lake communities along the Platte here<!-- TODO[MATT]: name the communities you've worked in, e.g. Ginger Cove, Ginger Woods, Riverside Lakes --> are exactly the kind of water Outback has built on since 1999: sandy soils, active boat traffic, and shorelines that need real engineering to hold.`,
      `Valley homeowners also remember what high water can do. The 2019 Platte River flooding hit this area hard, and a lot of shoreline infrastructure along these lakes has been repaired, rebuilt, or reinforced since. If your seawall or retaining wall predates 2019 and hasn't been evaluated since, that alone is worth an assessment.`,
      `What we do in Valley: custom <a class="ob-link" href="/services/boat-docks">boat docks and dock repair</a>, <a class="ob-link" href="/services/seawalls">seawall construction and storm repair</a>, waterfront <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a> for the swim frontage these communities are known for, and <a class="ob-link" href="/services/barge-work">barge work</a> for tight-access lots.`,
    ],
  },
  waterloo: {
    metaDescription: `Marine construction for Waterloo & Venice, NE private lakes — docks, seawalls, retaining walls, beaches & barge work. Owner-operated since 1999.`,
    mapQuery: `Waterloo, NE`,
    neighbors: ['valley', 'fremont'],
    localFaqTodo: `3–5 Waterloo & Venice-specific questions`,
    paragraphs: [
      `The Elkhorn and Platte corridor around Waterloo and Venice is lined with private sandpit lakes where the shoreline IS the property value.<!-- TODO[MATT]: name communities you've served here --> Outback has worked these lakes since 1999, and we know their personality: deep, clear sandpit water, sandy banks that move when you don't want them to, and ice that tests every dock and wall each winter.`,
      `Waterloo also sits in the flood memory of 2019, when the Elkhorn rewrote a lot of shoreline in this area. If your frontage still shows it — scoured beach, undercut wall, a dock that never sat right afterward — those are the projects we do every week.`,
    ],
  },
  fremont: {
    metaDescription: `Docks, seawalls, retaining walls & beach reclamation around Fremont's lakes, including Woodcliff. Local marine contractor, owner-operated since 1999.`,
    mapQuery: `Fremont, NE`,
    neighbors: ['valley', 'waterloo'],
    localFaqTodo: `3–5 — Woodcliff association requirements, common era/type of existing seawalls, dredging needs`,
    paragraphs: [
      `Fremont-area lake living centers on communities like Woodcliff and the sandpit lakes along the Platte south of town.<!-- TODO[MATT]: confirm/add the communities you serve here --> These are established waterfront neighborhoods where the docks, seawalls, and beaches were often built decades ago — which means a lot of the work here is smart replacement: taking aging infrastructure and rebuilding it to modern standards that handle today's bigger boats and wake.`,
      `Outback is based just down the road in Colon — Fremont's lakes are home turf. Since 1999 we've handled <a class="ob-link" href="/services/boat-docks">dock construction and repair</a>, <a class="ob-link" href="/services/seawalls">seawalls</a>, <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a>, and <a class="ob-link" href="/services/barge-work">barge-access projects</a> throughout the area.`,
    ],
  },
  bennington: {
    metaDescription: `Boat docks, seawalls, retaining walls & beach work for Bennington, NE lake communities. Owner-operated marine construction, built to last, since 1999.`,
    mapQuery: `Bennington, NE`,
    neighbors: ['omaha', 'valley'],
    localFaqTodo: `3–5`,
    paragraphs: [
      `The lake communities around Bennington<!-- TODO[MATT]: name them — e.g. Newport Landing, Bennington Lake area --> feature some of the metro's newer waterfront development — and newer doesn't mean maintenance-free. Builder-grade shoreline work often needs upgrading within a decade, especially where wake traffic is heavy. Outback builds and repairs <a class="ob-link" href="/services/boat-docks">docks</a>, <a class="ob-link" href="/services/seawalls">seawalls</a>, <a class="ob-link" href="/services/retaining-walls">retaining walls</a> and <a class="ob-link" href="/services/beach-reclamation">beaches</a> here to a different standard: ours.`,
    ],
  },
  springfield: {
    metaDescription: `Marine construction for Springfield, NE lake properties — docks, seawalls, retaining walls, beaches & barge work. Owner-operated since 1999.`,
    mapQuery: `Springfield, NE`,
    neighbors: ['omaha', 'plattsmouth'],
    localFaqTodo: `3–5`,
    paragraphs: [
      `South of the metro, Springfield-area lake properties<!-- TODO[MATT]: name the lakes/communities --> combine acreage living with private water — and private water is the owner's responsibility, from the dock to the last foot of shoreline. Outback handles all of it: <a class="ob-link" href="/services/boat-docks">docks</a>, <a class="ob-link" href="/services/seawalls">seawalls</a>, <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a>, and <a class="ob-link" href="/services/barge-work">barge work</a> for sites equipment can't reach by land. Since 1999.`,
    ],
  },
  plattsmouth: {
    metaDescription: `Marine construction at Beaver Lake & Plattsmouth, NE — seawalls, beaches, docks & barge work built for big-lake wave exposure. Owner-operated since 1999.`,
    mapQuery: `Beaver Lake, Nebraska`,
    neighbors: ['springfield', 'omaha'],
    localFaqTodo: `3–5`,
    paragraphs: [
      `Beaver Lake is one of Southeast Nebraska's largest private lake communities — hundreds of waterfront homes, serious boat traffic, and miles of shoreline that take real wave energy all summer. That combination is hard on seawalls, beaches, and docks, and it's exactly the work Outback has specialized in since 1999.`,
      `Whether it's a seawall showing its age, a beach that's migrated into the lake, a dock due for rebuild, or a tight-access lot that needs barge work, we build for Beaver Lake conditions specifically — wave exposure, ice, and the association standards that come with a managed lake community.<!-- TODO[MATT]: confirm Beaver Lake association approval process details + any other Plattsmouth-area water you serve -->`,
    ],
  },
};
