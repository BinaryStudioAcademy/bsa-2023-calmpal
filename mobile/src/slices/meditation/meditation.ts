import { createMeditationEntry, initPlayer } from './actions';
import { actions } from './meditation.slice';

const allActions = {
  ...actions,
  initPlayer,
  createMeditationEntry,
};

export { allActions as actions };
export { reducer } from './meditation.slice';
