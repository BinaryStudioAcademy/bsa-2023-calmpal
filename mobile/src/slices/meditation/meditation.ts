import {
  createMeditationEntry,
  getAllMeditationEntries,
  initPlayer,
  setPlaylist,
} from './actions';
import { actions } from './meditation.slice';

const allActions = {
  ...actions,
  initPlayer,
  setPlaylist,
  getAllMeditationEntries,
  createMeditationEntry,
};

export { allActions as actions };
export { reducer } from './meditation.slice';
