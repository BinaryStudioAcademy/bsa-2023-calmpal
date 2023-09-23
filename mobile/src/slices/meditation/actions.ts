import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
import { type MeditationEntryGetAllResponseDto } from '#packages/meditation/meditation';

import { name as sliceName } from './meditation.slice';

const initPlayer = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
  `${sliceName}/meditation`,
  (_, { extra }) => {
    const { player } = extra;

    void player.startPlayer();
  },
);

const getAllMeditationEntries = createAsyncThunk<
  MeditationEntryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-meditation-entries`, async (_, { extra }) => {
  const { meditationApi } = extra;

  return await meditationApi.getAllMeditationEntries();
});

export { getAllMeditationEntries, initPlayer };
