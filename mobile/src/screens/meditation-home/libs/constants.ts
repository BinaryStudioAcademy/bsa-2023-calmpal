import { type MeditationEntryCreateForm } from '#packages/meditation/meditation';

const mockedData = [
  { id: 1, title: 'Meditation' },
  { id: 2, title: 'Relaxing sounds' },
  { id: 3, title: 'Breath exercise' },
];

const DEFAULT_MEDITATION_PAYLOAD: MeditationEntryCreateForm = {
  name: '',
  file: null,
};
export { DEFAULT_MEDITATION_PAYLOAD, mockedData };
