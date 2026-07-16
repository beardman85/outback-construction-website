/**
 * Past-project pins for the Our Work map.
 * Coordinates come from the GPS embedded in Outback's drone photos (clustered
 * per job site, ~1km). Each `id` matches src/assets/jobs/job-<id>.jpg, which is
 * the NEWEST photo from that site.
 *
 * Rebuilt 2026-07-16 from the full 218-photo drone set (Sep 2023 – May 2026).
 * Community names are reverse-geocoded from the GPS; Beaver Lake was confirmed
 * by the owner. Services were read from the photos themselves.
 *
 * TODO[MATT]: confirm the sites marked 'general' below (North Bend + the two
 * Omaha-metro pins) — what service was that job? Also confirm the exact lake
 * name for the Fremont-area and Polk County pins.
 */
export interface Job {
  id: string;
  lat: number;
  lng: number;
  service: string; // service slug, or 'general'
  community: string;
  title: string;
}

export const jobs: Job[] = [
  { id: '00', lat: 41.31121, lng: -96.35964, service: 'seawalls', community: 'Valley', title: 'Seawall, beach & dock — full lakefront build' },
  { id: '01', lat: 41.3093, lng: -96.38441, service: 'beach-reclamation', community: 'Valley', title: 'Beach & dock' },
  { id: '02', lat: 41.3955, lng: -96.49114, service: 'boat-docks', community: 'Valley area', title: 'Custom boat dock & moorage' },
  { id: '03', lat: 41.42262, lng: -96.53194, service: 'boat-docks', community: 'Fremont area', title: 'Dock & shoreline work' },
  { id: '04', lat: 41.42323, lng: -97.39189, service: 'seawalls', community: 'Wagners Lake · Columbus', title: 'Seawall & tiered retaining wall' },
  { id: '05', lat: 41.10324, lng: -96.34183, service: 'seawalls', community: 'Riverside', title: 'Steel seawall & sand beach' },
  { id: '06', lat: 41.29806, lng: -96.33533, service: 'beach-reclamation', community: 'Valley', title: 'Beach & waterfront' },
  { id: '07', lat: 41.07316, lng: -96.04319, service: 'seawalls', community: 'Hawaiian Village · Papillion', title: 'Steel seawall & sand beach' },
  { id: '08', lat: 41.38151, lng: -96.47292, service: 'seawalls', community: 'Woodcliff', title: 'Seawall & shoreline access' },
  { id: '09', lat: 41.06484, lng: -95.95272, service: 'beach-reclamation', community: 'La Platte', title: 'Beach reclamation' },
  { id: '10', lat: 41.34336, lng: -97.44261, service: 'seawalls', community: 'Columbus area', title: 'Seawall & beach — large shoreline build' },
  { id: '11', lat: 40.91698, lng: -95.89526, service: 'seawalls', community: 'Beaver Lake', title: 'Seawall replacement & dock' },
  { id: '12', lat: 41.45576, lng: -96.78334, service: 'general', community: 'North Bend', title: 'Shoreline work' },
  { id: '13', lat: 41.4464, lng: -96.61018, service: 'barge-work', community: 'Ames · Fremont area', title: 'Barge dredging & shoreline work' },
  { id: '14', lat: 41.05352, lng: -96.11184, service: 'retaining-walls', community: 'Sandy Pointe · Springfield', title: 'Retaining wall & shoreline' },
  { id: '15', lat: 41.2533, lng: -96.26723, service: 'general', community: 'Omaha metro', title: 'Shoreline work' },
  { id: '16', lat: 41.26723, lng: -96.3289, service: 'general', community: 'Omaha metro', title: 'Shoreline work' },
];
