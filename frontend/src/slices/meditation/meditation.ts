import { createMeditationEntry } from './actions.js';
import { actions } from './meditation.slice.js';

const allActions = {
  ...actions,
  createMeditationEntry,
};

export { allActions as actions };
export { reducer } from './meditation.slice.js';
