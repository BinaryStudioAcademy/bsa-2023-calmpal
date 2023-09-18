import { AppRoute } from '#libs/enums/enums.js';
import { type MeditationEntryCreateForm } from '#packages/meditation/libs/types/types.js';

const TRACK_FIRST_INDEX = 0;
const TRACK_START_TIME = 0;
const FULL_PERCENTAGE = 100;
const TRACK_INCREMENT_INDEX = 1;
const TRACK_SKIP_SECONDS = 30;
const PROGRESS_BAR = '--player-progress';

const navigationItems = [{ name: 'Meditation', path: AppRoute.MEDITATION }];

const DEFAULT_MEDITATION_PAYLOAD: MeditationEntryCreateForm = {
  name: '',
  file: null,
};

const MOCKED_IMAGE = '../../src/assets/img/meditation-image-placeholder.jpg';

const MOCKED_DURATION = '10 min';

export {
  DEFAULT_MEDITATION_PAYLOAD,
  FULL_PERCENTAGE,
  MOCKED_DURATION,
  MOCKED_IMAGE,
  navigationItems,
  PROGRESS_BAR,
  TRACK_FIRST_INDEX,
  TRACK_INCREMENT_INDEX,
  TRACK_SKIP_SECONDS,
  TRACK_START_TIME,
};
