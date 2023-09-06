import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';
import { type MeditationEntryResponseDto } from '#packages/meditation/libs/types/types.js';

import { createMeditationEntry } from './actions.js';

type State = {
  meditationEntries: MeditationEntryResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  meditationEntries: [],
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'meditation',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createMeditationEntry.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(createMeditationEntry.fulfilled, (state, action) => {
      state.meditationEntries.push(action.payload);
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createMeditationEntry.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
