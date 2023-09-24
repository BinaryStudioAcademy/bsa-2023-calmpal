/* eslint-disable @typescript-eslint/no-magic-numbers */
import { SECONDS_IN_MINUTE } from '#libs/helpers/helpers.js';

const MEDITATION_DURATION = {
  SHORT: 5 * SECONDS_IN_MINUTE,
  MEDIUM: 10 * SECONDS_IN_MINUTE,
  LONG: 15 * SECONDS_IN_MINUTE,
} as const;

const DURATION_UNIT = {
  MINUTES: 'min',
} as const;

export { DURATION_UNIT, MEDITATION_DURATION };
