import { AppRoute } from '#libs/enums/enums.js';
import { type MeditationEntryCreateForm } from '#packages/meditation/libs/types/types.js';

const TRACK_FIRST_INDEX = 0;
const TRACK_START_TIME = 0;
const FULL_PERCENTAGE = 100;
const TRACK_INCREMENT_INDEX = 1;
const TRACK_SKIP_SECONDS = 30;
const PROGRESS_BAR = '--player-progress';

const SECONDS_IN_MINUTE = 60;
const MINUTES_FORMATTING_BASE = 2;

const navigationItems = [{ name: 'Meditation', path: AppRoute.MEDITATION }];

const DEFAULT_MEDITATION_PAYLOAD: MeditationEntryCreateForm = {
  name: '',
  file: null,
};

export {
  DEFAULT_MEDITATION_PAYLOAD,
  FULL_PERCENTAGE,
  MINUTES_FORMATTING_BASE,
  navigationItems,
  PROGRESS_BAR,
  SECONDS_IN_MINUTE,
  TRACK_FIRST_INDEX,
  TRACK_INCREMENT_INDEX,
  TRACK_SKIP_SECONDS,
  TRACK_START_TIME,
};
