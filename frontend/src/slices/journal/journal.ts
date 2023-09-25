import {
  createJournalEntry,
  deleteJournal,
  getAllJournalEntries,
  updateJournalEntry,
} from './actions.js';
import { actions } from './journal.slice.js';

const allActions = {
  ...actions,
  createJournalEntry,
  getAllJournalEntries,
  updateJournalEntry,
  deleteJournal,
};

export { allActions as actions };
export { reducer } from './journal.slice.js';
