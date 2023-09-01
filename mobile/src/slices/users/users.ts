import { actions } from './users.slice';

const allActions = {
  ...actions,
};

export { allActions as actions };
export { reducer } from './users.slice';
