import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';
import { type JournalEntryGetAllItemResponseDto } from '#packages/journal/journal.js';

import {
  createJournalEntry,
  deleteJournal,
  getAllJournalEntries,
} from './actions.js';

type State = {
  allJournalEntries: JournalEntryGetAllItemResponseDto[];
  selectedJournalEntry: JournalEntryGetAllItemResponseDto | null;
  journalEntriesDataStatus: ValueOf<typeof DataStatus>;
  createJournalEntryDataStatus: ValueOf<typeof DataStatus>;
  deleteJournalEntryDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  allJournalEntries: [],
  selectedJournalEntry: null,
  journalEntriesDataStatus: DataStatus.IDLE,
  createJournalEntryDataStatus: DataStatus.IDLE,
  deleteJournalEntryDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'journal',
  reducers: {
    setSelectedJournalEntry: (state, action) => {
      state.selectedJournalEntry =
        state.allJournalEntries.find((entry) => {
          return entry.id === action.payload;
        }) ?? null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllJournalEntries.pending, (state) => {
      state.journalEntriesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllJournalEntries.fulfilled, (state, action) => {
      state.allJournalEntries = action.payload.items;
      state.journalEntriesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllJournalEntries.rejected, (state) => {
      state.journalEntriesDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(createJournalEntry.pending, (state) => {
      state.createJournalEntryDataStatus = DataStatus.PENDING;
    });
    builder.addCase(createJournalEntry.fulfilled, (state, action) => {
      state.allJournalEntries.push(action.payload);
      state.createJournalEntryDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createJournalEntry.rejected, (state) => {
      state.createJournalEntryDataStatus = DataStatus.REJECTED;
    });
    builder.addCase(deleteJournal.pending, (state) => {
      state.deleteJournalEntryDataStatus = DataStatus.PENDING;
    });
    builder.addCase(deleteJournal.fulfilled, (state, action) => {
      state.allJournalEntries = action.payload;
      state.deleteJournalEntryDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(deleteJournal.rejected, (state) => {
      state.deleteJournalEntryDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
