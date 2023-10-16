import { TRACK_START_TIME } from '~/pages/meditation/libs/constants/constants.js';

import { AudioOptionKey } from '../enums/enums.js';

const DEFAULT_AUDIO_OPTIONS = {
  [AudioOptionKey.TIME_PROGRESS]: TRACK_START_TIME,
  [AudioOptionKey.DURATION]: TRACK_START_TIME,
  [AudioOptionKey.TIMER_DURATION]: TRACK_START_TIME,
};

export { DEFAULT_AUDIO_OPTIONS };
