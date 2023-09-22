const MEDITATION_DURATION = {
  SHORT: '5',
  MEDIUM: '10',
  LONG: '15',
} as const;

const DURATION_UNIT = {
  MINUTES: 'min',
} as const;

export { DURATION_UNIT, MEDITATION_DURATION };
