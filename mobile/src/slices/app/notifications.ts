import { notify } from './actions';
import { actions } from './notifications.slice';

const allActions = {
  ...actions,
  notify,
};

export { allActions as appActions };
export { reducer } from './notifications.slice';
