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
    metaDescription: `Marine construction contractor serving Omaha's lakefront properties — boat docks, seawalls, retaining walls, barge work & beach reclamation. Owner-operated since 1998.`,
    mapQuery: `Omaha, NE`,
    neighbors: ['bennington', 'springfield'],
    localFaqTodo: `3–5 Omaha-specific questions`,
    paragraphs: [
      `Omaha's lakefront properties are spread across the metro — private lake communities, sandpit lakes on the city's west and south edges, and acreage properties with their own water.<!-- TODO[MATT]: name the Omaha-metro communities/lakes you serve --> What they share: owners who've invested heavily in their waterfront and need a contractor who specializes in it.`,
      `That specialization is the whole company. Docks, seawalls, retaining walls, barge work, and beach reclamation — marine construction is all Outback has done since 1998. Omaha homeowners typically find us after the general contractor says "we don't really do water" — or after the cheap fix from a few years ago starts leaning.`,
    ],
  },
  valley: {
    metaDescription: `Boat docks, seawalls, retaining walls & beach reclamation for Valley, NE sandpit-lake communities. Owner-operated marine construction since 1998.`,
    mapQuery: `Valley, NE`,
    neighbors: ['waterloo', 'fremont'],
    localFaqTodo: `3–5 Valley-specific questions — HOA/lake association approval processes, common wall types in these communities, wake boat traffic`,
    paragraphs: [
      `Valley sits at the heart of Nebraska sandpit-lake country. The lake communities along the Platte here<!-- TODO[MATT]: name the communities you've worked in, e.g. Ginger Cove, Ginger Woods, Riverside Lakes --> are exactly the kind of water Outback has built on since 1998: sandy soils, active boat traffic, and shorelines that need real engineering to hold.`,
      `Valley homeowners also remember what high water can do. The 2019 Platte River flooding hit this area hard, and a lot of shoreline infrastructure along these lakes has been repaired, rebuilt, or reinforced since. If your seawall or retaining wall predates 2019 and hasn't been evaluated since, that alone is worth an assessment.`,
      `What we do in Valley: custom <a class="ob-link" href="/services/boat-docks">boat docks and dock repair</a>, <a class="ob-link" href="/services/seawalls">seawall construction and storm repair</a>, waterfront <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a> for the swim frontage these communities are known for, and <a class="ob-link" href="/services/barge-work">barge work</a> for tight-access lots.`,
    ],
  },
  waterloo: {
    metaDescription: `Marine construction for Waterloo & Venice, NE private lakes — docks, seawalls, retaining walls, beaches & barge work. Owner-operated since 1998.`,
    mapQuery: `Waterloo, NE`,
    neighbors: ['valley', 'fremont'],
    localFaqTodo: `3–5 Waterloo & Venice-specific questions`,
    paragraphs: [
      `The Elkhorn and Platte corridor around Waterloo and Venice is lined with private sandpit lakes where the shoreline IS the property value.<!-- TODO[MATT]: name communities you've served here --> Outback has worked these lakes since 1998, and we know their personality: deep, clear sandpit water, sandy banks that move when you don't want them to, and ice that tests every dock and wall each winter.`,
      `Waterloo also sits in the flood memory of 2019, when the Elkhorn rewrote a lot of shoreline in this area. If your frontage still shows it — scoured beach, undercut wall, a dock that never sat right afterward — those are the projects we do every week.`,
    ],
  },
  fremont: {
    metaDescription: `Marine construction for Fremont's lake communities — Woodcliff, Lake Ridge, Cottonwood Cove & more. Docks, seawalls, retaining walls & beaches. Owner-operated since 1998.`,
    mapQuery: `Fremont, NE`,
    neighbors: ['woodcliff', 'valley', 'waterloo'],
    localFaqTodo: `3–5 — association requirements by community, common era/type of existing seawalls, dredging needs`,
    paragraphs: [
      `Fremont sits at the center of a cluster of private lake communities — <strong>Woodcliff</strong>, Lake Ridge, Cottonwood Cove, and the sandpit lakes along the Platte south of town.<!-- TODO[MATT]: confirm which Fremont-area communities to list --> These are established waterfront neighborhoods where docks, seawalls, and beaches were often built decades ago, so much of the work here is smart replacement — rebuilding aging infrastructure to modern standards that handle today's bigger boats and wake.`,
      `Woodcliff is the largest of these, and we've built seawalls and shoreline access there. See our dedicated <a class="ob-link" href="/locations/woodcliff">Woodcliff marine construction</a> page for that community specifically.`,
      `Outback is based just down the road in Colon, so Fremont's lakes are home turf. Since 1998 we've handled <a class="ob-link" href="/services/boat-docks">dock construction and repair</a>, <a class="ob-link" href="/services/seawalls">seawalls</a>, <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a>, and <a class="ob-link" href="/services/barge-work">barge-access projects</a> throughout the area.`,
    ],
  },
  woodcliff: {
    metaDescription: `Marine construction at Woodcliff Lakes near Fremont, NE — seawalls, boat docks, retaining walls & beach reclamation, built to association standards. Owner-operated since 1998.`,
    mapQuery: `Woodcliff, NE`,
    neighbors: ['fremont', 'valley'],
    localFaqTodo: `3–5 Woodcliff-specific — association approval process/standards, typical seawall era & signs it needs replacing, dock rebuild timing`,
    paragraphs: [
      `Woodcliff is one of the largest and most established lake communities in the Fremont area — a private, managed lake where the shoreline is the whole reason people live here. Much of Woodcliff's dock, seawall, and beach infrastructure was built decades ago, which means a lot of the work here is smart replacement: taking aging, undersized, or failing structures and rebuilding them to handle today's bigger boats, heavier wake, and Nebraska winters. Outback has built seawalls and shoreline access along Woodcliff's water — it's exactly the kind of managed-lake project we specialize in.`,
      `Because Woodcliff is an association-managed lake, shoreline projects often come with approval requirements and construction standards.<!-- TODO[MATT]: confirm Woodcliff association approval specifics --> We're used to working within them — planning the build, staging materials on tight lake lots, and doing the work cleanly so it passes review and lasts. If your seawall is leaning, your beach has migrated into the lake, or your dock is due for a rebuild, that's a straight assessment away.`,
      `At Woodcliff we handle the full range of marine construction: <a class="ob-link" href="/services/seawalls">seawall construction and storm repair</a>, custom <a class="ob-link" href="/services/boat-docks">boat docks and dock repair</a>, waterfront <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a> for swim frontage, and <a class="ob-link" href="/services/barge-work">barge work</a> for tight-access lots. Owner Matt Wesch walks every Woodcliff shoreline personally.`,
    ],
  },
  bennington: {
    metaDescription: `Marine construction for Bennington's lake communities — Newport Landing, Bennington Lake & more. Docks, seawalls, retaining walls & beaches. Owner-operated since 1998.`,
    mapQuery: `Bennington, NE`,
    neighbors: ['newport-landing', 'omaha', 'valley'],
    localFaqTodo: `3–5 — Newport Landing association standards, builder-grade replacement timelines, wake damage`,
    paragraphs: [
      `The lake communities around Bennington — <strong>Newport Landing</strong>, Bennington Lake, and Newport Vista<!-- TODO[MATT]: confirm the Bennington-area communities you serve --> — are some of the metro's newest waterfront development. And newer doesn't mean maintenance-free: builder-grade shoreline work often needs upgrading within a decade, especially where wake traffic is heavy.`,
      `Newport Landing is the premier development here. See our dedicated <a class="ob-link" href="/locations/newport-landing">Newport Landing marine construction</a> page for that community specifically.`,
      `Across the Bennington area, Outback builds and repairs <a class="ob-link" href="/services/boat-docks">docks</a>, <a class="ob-link" href="/services/seawalls">seawalls</a>, <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, and <a class="ob-link" href="/services/beach-reclamation">beaches</a> to a different standard: ours.`,
    ],
  },
  'newport-landing': {
    metaDescription: `Dock, seawall, retaining wall & beach construction at Newport Landing in Bennington, NE. Owner-operated marine contractor built for wake and Nebraska winters. Since 1998.`,
    mapQuery: `Newport Landing, Bennington, NE`,
    neighbors: ['bennington', 'omaha'],
    localFaqTodo: `3–5 Newport Landing-specific — association approval/standards, builder-grade dock lifespan, wake & ice damage signs`,
    paragraphs: [
      `Newport Landing is Bennington's premier lake development — a private, wake-friendly lake where the shoreline is the centerpiece of every property. It's newer waterfront, but newer doesn't mean maintenance-free: builder-grade docks, seawalls, and retaining walls often need upgrading within a decade, especially on a lake with heavy wake and boat traffic. That's exactly the work Outback specializes in.`,
      `We build and repair to a standard that holds up to Newport Landing's conditions — bigger boats, constant wake, ice heave, and the water swings that come with a managed lake.<!-- TODO[MATT]: note any real Newport Landing projects to feature --> If your seawall is starting to lean, your beach is washing out, or a builder-grade dock is already showing its age, owner Matt Wesch will walk your shoreline and give you a straight assessment — including "this can wait" when that's the honest answer.`,
      `At Newport Landing we handle <a class="ob-link" href="/services/boat-docks">boat docks and dock repair</a>, <a class="ob-link" href="/services/seawalls">seawall construction and storm repair</a>, waterfront <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a>, and <a class="ob-link" href="/services/barge-work">barge work</a> for tight-access lots — all built with premium materials, engineered to last.`,
    ],
  },
  springfield: {
    metaDescription: `Marine construction for Springfield, NE lake properties — docks, seawalls, retaining walls, beaches & barge work. Owner-operated since 1998.`,
    mapQuery: `Springfield, NE`,
    neighbors: ['omaha', 'plattsmouth'],
    localFaqTodo: `3–5`,
    paragraphs: [
      `South of the metro, Springfield-area lake properties<!-- TODO[MATT]: name the lakes/communities --> combine acreage living with private water — and private water is the owner's responsibility, from the dock to the last foot of shoreline. Outback handles all of it: <a class="ob-link" href="/services/boat-docks">docks</a>, <a class="ob-link" href="/services/seawalls">seawalls</a>, <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a>, and <a class="ob-link" href="/services/barge-work">barge work</a> for sites equipment can't reach by land. Since 1998.`,
    ],
  },
  plattsmouth: {
    metaDescription: `Marine construction around Plattsmouth & Louisville, NE — Beaver Lake, Buccaneer Bay & Copper Dollar Cove. Docks, seawalls, beaches & barge work. Owner-operated since 1998.`,
    mapQuery: `Plattsmouth, NE`,
    neighbors: ['beaver-lake', 'springfield', 'omaha'],
    localFaqTodo: `3–5 — association processes by lake, big-lake wave/ice damage, barge access`,
    paragraphs: [
      `South of the metro along the Platte, the Plattsmouth and Louisville area is home to some of Southeast Nebraska's biggest private lakes — <strong>Beaver Lake</strong>, Buccaneer Bay, and Copper Dollar Cove<!-- TODO[MATT]: confirm the Plattsmouth/Louisville-area lakes you serve -->. These are established, high-traffic lakes where wave exposure and ice are hard on shoreline infrastructure.`,
      `Beaver Lake is the largest, with a formal association and its own construction standards. See our dedicated <a class="ob-link" href="/locations/beaver-lake">Beaver Lake marine construction</a> page for that community specifically.`,
      `Across the Plattsmouth and Louisville lakes, Outback builds and repairs <a class="ob-link" href="/services/seawalls">seawalls</a>, <a class="ob-link" href="/services/beach-reclamation">beaches</a>, <a class="ob-link" href="/services/boat-docks">docks</a>, and <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, and handles <a class="ob-link" href="/services/barge-work">barge work</a> for tight-access lots. Since 1998.`,
    ],
  },
  'beaver-lake': {
    metaDescription: `Dock, seawall & beach construction at Beaver Lake, NE — built for big-lake wave exposure, ice, and Beaver Lake Association standards. Owner-operated marine contractor since 1998.`,
    mapQuery: `Beaver Lake, Nebraska`,
    neighbors: ['plattsmouth', 'springfield'],
    localFaqTodo: `3–5 Beaver Lake-specific — Association approval process & standards, wave/ice damage, barge access for tight lots`,
    paragraphs: [
      `Beaver Lake is one of Southeast Nebraska's largest private lake communities — hundreds of waterfront homes, serious boat traffic, and miles of shoreline that take real wave energy all summer. That combination is hard on seawalls, beaches, and docks, and it's exactly the work Outback has specialized in since 1998.`,
      `Beaver Lake is managed by a formal association, and shoreline projects here come with rules, standards, and an approval process. We're familiar with working inside those requirements — planning the project, meeting the association's standards, and building it to last.<!-- TODO[MATT]: confirm Beaver Lake Association approval specifics --> Whether it's a seawall showing its age, a beach that's migrated into the lake, a dock due for a rebuild, or a tight-access lot that needs barge work, we build for Beaver Lake conditions specifically.`,
      `At Beaver Lake we handle <a class="ob-link" href="/services/seawalls">seawall construction and storm repair</a>, <a class="ob-link" href="/services/beach-reclamation">beach reclamation</a>, <a class="ob-link" href="/services/boat-docks">boat docks and dock repair</a>, <a class="ob-link" href="/services/retaining-walls">retaining walls</a>, and <a class="ob-link" href="/services/barge-work">barge work</a> for lots equipment can't reach by land.`,
    ],
  },
};
