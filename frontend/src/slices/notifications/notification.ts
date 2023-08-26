import { actions } from '#slices/notifications/app.slice.js';

import { notify } from './actions.js';

const allActions = {
  ...actions,
  notify,
};

export { allActions as appActions };
export { reducer } from '#slices/notifications/app.slice.js';
