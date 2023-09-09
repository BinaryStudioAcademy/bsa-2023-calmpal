import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums';
import { type ValueOf } from '#libs/types/types';
import { type JournalEntryGetAllItemResponseDto } from '#packages/journal/journal';

import { createJournalEntry, getAllJournalEntriers } from './actions';

type State = {
  allJournalEntries: JournalEntryGetAllItemResponseDto[];
  selectedJournalEntry: JournalEntryGetAllItemResponseDto | null;
  journalEntriesDataStatus: ValueOf<typeof DataStatus>;
  createJournalEntryDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  allJournalEntries: [],
  selectedJournalEntry: null,
  journalEntriesDataStatus: DataStatus.IDLE,
  createJournalEntryDataStatus: DataStatus.IDLE,
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
    builder.addCase(getAllJournalEntriers.pending, (state) => {
      state.journalEntriesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllJournalEntriers.fulfilled, (state, action) => {
      state.allJournalEntries = action.payload.items;
      state.journalEntriesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllJournalEntriers.rejected, (state) => {
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
  },
});

export { actions, name, reducer };
