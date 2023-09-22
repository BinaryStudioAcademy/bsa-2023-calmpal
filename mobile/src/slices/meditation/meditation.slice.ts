import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums';
import { type ValueOf } from '#libs/types/types';
import { type MeditationEntryCreateResponseDto } from '#packages/meditation/meditation';

import { getAllMeditationEntries } from './actions';

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
