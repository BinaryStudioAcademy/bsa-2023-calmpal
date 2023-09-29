import { AppRoute } from '#libs/enums/enums.js';
import { type MeditationEntryCreateForm } from '#packages/meditation/libs/types/types.js';

const TRACK_FIRST_INDEX = 0;
const FULL_PERCENTAGE = 100;
const TRACK_INCREMENT_INDEX = 1;
const PROGRESS_BAR = '--player-progress';

const navigationItems = [{ name: 'Meditation', path: AppRoute.MEDITATION }];

const DEFAULT_MEDITATION_PAYLOAD: MeditationEntryCreateForm = {
  name: '',
  file: null,
};

export {
  DEFAULT_MEDITATION_PAYLOAD,
  FULL_PERCENTAGE,
  navigationItems,
  PROGRESS_BAR,
  TRACK_FIRST_INDEX,
  TRACK_INCREMENT_INDEX,
};
export {
  DURATION_UNIT,
  MEDITATION_DURATION,
  TRACK_SKIP_SECONDS,
  TRACK_START_TIME,
} from 'shared/build/index.js';
