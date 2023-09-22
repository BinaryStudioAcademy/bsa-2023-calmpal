import {
  createMeditationEntry,
  getAllMeditationEntries,
  initPlayer,
} from './actions';
import { actions } from './meditation.slice';

const allActions = {
  ...actions,
  initPlayer,
  getAllMeditationEntries,
  createMeditationEntry,
};

export { allActions as actions };
export { reducer } from './meditation.slice';
