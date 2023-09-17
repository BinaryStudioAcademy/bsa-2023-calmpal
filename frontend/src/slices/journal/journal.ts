import {
  createJournalEntry,
  deleteJournal,
  getAllJournalEntries,
} from './actions.js';
import { actions } from './journal.slice.js';

const allActions = {
  ...actions,
  createJournalEntry,
  getAllJournalEntries,
  deleteJournal,
};

export { allActions as actions };
export { reducer } from './journal.slice.js';
