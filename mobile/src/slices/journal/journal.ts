import {
  createJournalEntry,
  deleteJournal,
  getAllJournalEntries,
  updateJournalEntry,
} from './actions';
import { actions } from './journal.slice';

const allActions = {
  ...actions,
  createJournalEntry,
  getAllJournalEntries,
  updateJournalEntry,
  deleteJournal,
};

export { allActions as actions };
export { reducer } from './journal.slice';
