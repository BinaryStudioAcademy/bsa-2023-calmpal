import { createJournalEntry, getAllJournalEntries } from './actions.js';
import { actions } from './journal.slice.js';

const allActions = {
  ...actions,
  createJournalEntry,
  getAllJournalEntries,
};

export { allActions as actions };
export { reducer } from './journal.slice.js';
