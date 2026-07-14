/**
 * Past-project pins for the Our Work map.
 * Coordinates come from the GPS embedded in Outback's drone photos (clustered
 * per job site). Each `id` matches src/assets/jobs/job-<id>.jpg.
 *
 * TODO[MATT]: service, community and title were auto-derived (photo GPS →
 * reverse-geocode → a visual read of each shot). Please confirm/refine — especially
 * the exact lake community name for each pin, and the service if I guessed wrong.
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
  { id: '00', lat: 41.31113, lng: -96.3598, service: 'seawalls', community: 'Valley', title: 'Seawall, beach & dock — full lakefront build' },
  { id: '01', lat: 41.42289, lng: -96.53196, service: 'boat-docks', community: 'Fremont area', title: 'Dock & shoreline work' },
  { id: '02', lat: 41.38177, lng: -96.47407, service: 'seawalls', community: 'Woodcliff', title: 'Seawall & shoreline access' },
  { id: '03', lat: 41.3091, lng: -96.38468, service: 'beach-reclamation', community: 'Valley', title: 'Beach & dock' },
  { id: '04', lat: 41.39082, lng: -96.4842, service: 'boat-docks', community: 'Valley area', title: 'Boat dock & lift' },
  { id: '05', lat: 41.3854, lng: -96.47498, service: 'seawalls', community: 'Woodcliff', title: 'Seawall & sand beach' },
  { id: '06', lat: 41.39215, lng: -96.49088, service: 'boat-docks', community: 'Valley area', title: 'Custom boat dock & moorage' },
  { id: '07', lat: 41.29828, lng: -96.33627, service: 'beach-reclamation', community: 'Valley', title: 'Beach & waterfront' },
  { id: '08', lat: 41.06488, lng: -95.95324, service: 'beach-reclamation', community: 'La Platte · Omaha metro', title: 'Beach reclamation' },
  { id: '09', lat: 41.44637, lng: -96.61007, service: 'barge-work', community: 'Fremont area', title: 'Barge dredging & shoreline work' },
  { id: '10', lat: 41.10333, lng: -96.3413, service: 'seawalls', community: 'Riverside', title: 'Steel seawall & sand beach' },
  { id: '11', lat: 41.42313, lng: -97.39213, service: 'seawalls', community: 'Columbus', title: 'Seawall & dock' },
  { id: '12', lat: 41.30736, lng: -96.35657, service: 'seawalls', community: 'Omaha metro', title: 'Lakefront seawall' },
  { id: '13', lat: 41.05333, lng: -96.11138, service: 'retaining-walls', community: 'Springfield area', title: 'Retaining wall & shoreline' },
];
