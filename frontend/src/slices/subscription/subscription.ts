import { createPaymentIntent } from './actions.js';
import { actions } from './subscription.slice.js';

const allActions = {
  ...actions,
  createPaymentIntent,
};

export { allActions as actions };
export { reducer } from './subscription.slice.js';
