import { showErrorNotification } from './actions.js';
import { actions } from './notification.slice.js';

const allActions = {
  ...actions,
  showErrorNotification,
};

export { allActions as actions };
export { reducer } from './notification.slice.js';
