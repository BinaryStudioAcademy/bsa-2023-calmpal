import { type MeditationEntryCreateForm } from 'shared/build/index.js';

const mockedData = [
  { id: 1, title: 'Favorites' },
  { id: 2, title: 'Meditation' },
  { id: 3, title: 'Relaxing sounds' },
  { id: 4, title: 'Daily inspiration' },
  { id: 5, title: 'Breath exercise' },
  { id: 6, title: 'Favorites' },
  { id: 7, title: 'Meditation' },
  { id: 8, title: 'Relaxing sounds' },
  { id: 9, title: 'Daily inspiration' },
  { id: 10, title: 'Breath exercise' },
];

const DEFAULT_MEDITATION_PAYLOAD: MeditationEntryCreateForm = {
  title: '',
  file: null,
  fileType: null,
  fileSize: null,
};
export { DEFAULT_MEDITATION_PAYLOAD, mockedData };
