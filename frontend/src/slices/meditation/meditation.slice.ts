import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';
import { type MeditationEntryCreateResponseDto } from '#packages/meditation/meditation.js';

import { createMeditationEntry, getAllMeditationEntries } from './actions.js';

type State = {
  meditationEntries: MeditationEntryCreateResponseDto[];
  meditationEntriesDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  meditationEntries: [],
  meditationEntriesDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'meditation',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createMeditationEntry.pending, (state) => {
      state.meditationEntriesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(createMeditationEntry.fulfilled, (state, action) => {
      state.meditationEntries.push(action.payload);
      state.meditationEntriesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createMeditationEntry.rejected, (state) => {
      state.meditationEntriesDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getAllMeditationEntries.pending, (state) => {
      state.meditationEntriesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllMeditationEntries.fulfilled, (state, action) => {
      state.meditationEntries = action.payload.items;
      state.meditationEntriesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllMeditationEntries.rejected, (state) => {
      state.meditationEntriesDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
