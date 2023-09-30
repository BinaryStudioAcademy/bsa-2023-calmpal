import { createSlice } from '@reduxjs/toolkit';

import { FIRST_ARRAY_INDEX } from '#libs/constants/constants';
import { DataStatus } from '#libs/enums/enums';
import { meditationEntryToTrack } from '#libs/packages/player/player';
import { type Track } from '#libs/packages/player/player';
import { type ValueOf } from '#libs/types/types';
import { type MeditationEntryGetAllItemResponseDto } from '#packages/meditation/meditation';

import { createMeditationEntry, getAllMeditationEntries } from './actions';

type State = {
  meditationEntries: Track[];
  selectedMeditationEntry: Track | null;
  meditationEntriesDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  selectedMeditationEntry: null,
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
    builder.addCase(createMeditationEntry.fulfilled, (state, action) => {
      const trackArray = meditationEntryToTrack([
        action.payload as MeditationEntryGetAllItemResponseDto,
      ]);
      state.meditationEntries.push(trackArray[FIRST_ARRAY_INDEX] as Track);
      state.meditationEntriesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createMeditationEntry.rejected, (state) => {
      state.meditationEntriesDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
