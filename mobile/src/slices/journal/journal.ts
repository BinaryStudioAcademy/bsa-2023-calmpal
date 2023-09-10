import { getAllJournalEntriers } from './actions';
import { actions } from './journal.slice';

const allActions = {
  ...actions,
  getAllJournalEntriers,
};

export { allActions as actions };
export { reducer } from './journal.slice';
