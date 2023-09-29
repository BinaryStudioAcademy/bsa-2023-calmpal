import { Player } from './player.package';

const player = new Player();
export { player };
export { AppStatus } from './libs/enums/enums';
export {
  Event,
  State,
  useTrackPlayerEvents as usePlayerEvents,
} from './player.package';
