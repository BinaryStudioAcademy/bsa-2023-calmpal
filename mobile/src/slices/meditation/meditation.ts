import { getAllMeditationEntries, initPlayer, setPlaylist } from './actions';
import { actions } from './meditation.slice';

const allActions = {
  ...actions,
  initPlayer,
  setPlaylist,
  getAllMeditationEntries,
};

export { allActions as actions };
export { reducer } from './meditation.slice';
