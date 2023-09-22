import { getAllMeditationEntries, initPlayer } from './actions';
import { actions } from './meditation.slice';

const allActions = {
  ...actions,
  initPlayer,
  getAllMeditationEntries,
};

export { allActions as actions };
export { reducer } from './meditation.slice';
