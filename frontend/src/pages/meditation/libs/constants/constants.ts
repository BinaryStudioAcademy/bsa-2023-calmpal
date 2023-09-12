const MEDITATION_ENTRIES = [
  {
    id: 1,
    title: 'Meditation for deep sleep',
    durationKey: 'MEDIUM',
  },
  {
    id: 2,
    title: 'Breathing meditation',
    durationKey: 'SHORT',
  },
  {
    id: 3,
    title: 'Meditation for relax',
    durationKey: 'LONG',
  },
  {
    id: 4,
    title: 'Nature meditation',
    durationKey: 'EXTRA_LONG',
  },
] as const;

const MEDITATION_DURATION = {
  SHORT: '5',
  MEDIUM: '10',
  LONG: '15',
  EXTRA_LONG: '20',
};

const DURATION_UNIT = {
  MINUTES: 'min',
};

export { DURATION_UNIT, MEDITATION_DURATION, MEDITATION_ENTRIES };
