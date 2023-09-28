import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums';
import { meditationEntryToTrack } from '#libs/packages/player/player';
import { type Track, type ValueOf } from '#libs/types/types';

import { createMeditationEntry, getAllMeditationEntries } from './actions';

type State = {
  meditationEntries: Track[];
  selectedMeditationEntry: Track;
  meditationEntriesDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  selectedMeditationEntry: {} as Track,
  meditationEntries: [],
  meditationEntriesDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'meditation',
  reducers: {
    setSelectedMeditationEntry: (state, action) => {
      state.selectedMeditationEntry = state.meditationEntries.find((entry) => {
        return entry.id === action.payload;
      }) as Track;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllMeditationEntries.pending, (state) => {
      state.meditationEntriesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllMeditationEntries.fulfilled, (state, action) => {
      state.meditationEntries = meditationEntryToTrack(action.payload.items);
      state.meditationEntriesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllMeditationEntries.rejected, (state) => {
      state.meditationEntriesDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(createMeditationEntry.pending, (state) => {
      state.meditationEntriesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(createMeditationEntry.fulfilled, (state) => {
      state.meditationEntries = [];
      state.meditationEntriesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createMeditationEntry.rejected, (state) => {
      state.meditationEntriesDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
