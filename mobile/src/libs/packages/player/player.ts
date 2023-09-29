import { Player } from './player.package';

const player = new Player();
export { player };
export { AppStatus } from './libs/enums/enums';
export { meditationEntryToTrack } from './libs/maps/maps';
export { type Track } from './libs/types/types';
export {
  Event,
  State,
  useTrackPlayerEvents as usePlayerEvents,
  useProgress,
} from './player.package';
