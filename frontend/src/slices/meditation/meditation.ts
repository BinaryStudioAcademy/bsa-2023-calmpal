import { createMeditationEntry, getAllMeditationEntries } from './actions.js';
import { actions } from './meditation.slice.js';

const allActions = {
  ...actions,
  createMeditationEntry,
  getAllMeditationEntries,
};

export { allActions as actions };
export { reducer } from './meditation.slice.js';
