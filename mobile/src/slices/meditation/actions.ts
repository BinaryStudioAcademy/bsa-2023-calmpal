import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig, type Track } from '#libs/types/types';
import { type MeditationEntryGetAllResponseDto } from '#packages/meditation/meditation';

import { name as sliceName } from './meditation.slice';

const initPlayer = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
  `${sliceName}/init-player`,
  (_, { extra }) => {
    const { player } = extra;

    void player.startPlayer();
  },
);

const setPlaylist = createAsyncThunk<unknown, Track[], AsyncThunkConfig>(
  `${sliceName}/set-playlist`,
  (meditations, { extra }) => {
    const { player } = extra;
    void player.setPlaylist(meditations);
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

export { getAllMeditationEntries, initPlayer, setPlaylist };
