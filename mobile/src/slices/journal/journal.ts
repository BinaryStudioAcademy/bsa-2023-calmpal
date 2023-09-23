import {
  createJournalEntry,
  getAllJournalEntries,
  updateJournalEntry,
} from './actions';
import { actions } from './journal.slice';

const allActions = {
  ...actions,
  createJournalEntry,
  getAllJournalEntries,
  updateJournalEntry,
};

export { allActions as actions };
export { reducer } from './journal.slice';
