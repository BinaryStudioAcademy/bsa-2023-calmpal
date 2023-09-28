import { Player } from './player.package';

const player = new Player();
export { player };
export { meditationEntryToTrack } from './libs/maps/maps';
export {
  Event,
  State,
  useTrackPlayerEvents as usePlayerEvents,
  useProgress,
} from './player.package';
