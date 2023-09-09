import { createJournalEntry, getAllJournalEntriers } from './actions';
import { actions } from './journal.slice';

const allActions = {
  ...actions,
  createJournalEntry,
  getAllJournalEntriers,
};

export { allActions as actions };
export { reducer } from './journal.slice';
