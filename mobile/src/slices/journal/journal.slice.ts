import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums';
import { type ValueOf } from '#libs/types/types';
import { type JournalEntryGetAllItemResponseDto } from '#packages/journal/journal';

import { getAllJournalEntries } from './actions';

type State = {
  allJournalEntries: JournalEntryGetAllItemResponseDto[];
  journalEntriesDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  allJournalEntries: [],
  journalEntriesDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'journal',
  reducers: {},
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
  },
});

export { actions, name, reducer };
