import { getAllJournalEntries } from './actions';
import { actions } from './journal.slice';

const allActions = {
  ...actions,
  getAllJournalEntries,
};

export { allActions as actions };
export { reducer } from './journal.slice';
