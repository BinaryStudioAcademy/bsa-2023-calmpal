import { createAsyncThunk } from '@reduxjs/toolkit';

import { type Track } from '~/libs/packages/player/player';
import { type AsyncThunkConfig } from '~/libs/types/types';
import {
  type MeditationEntryCreateRequestDto,
  type MeditationEntryCreateResponseDto,
  type MeditationEntryGetAllResponseDto,
} from '~/packages/meditation/meditation';
import { appActions } from '~/slices/app/notifications';

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

const createMeditationEntry = createAsyncThunk<
  MeditationEntryCreateResponseDto,
  MeditationEntryCreateRequestDto,
  AsyncThunkConfig
>(
  `${sliceName}/create-meditation-entry`,
  async (payload, { extra, dispatch }) => {
    const { meditationApi } = extra;
    const item = await meditationApi.createMeditationEntry(payload);

    void dispatch(
      appActions.notify({
        type: 'success',
        message: `Meditation ${payload.name} was added.`,
      }),
    );

    return item;
  },
);
export {
  createMeditationEntry,
  getAllMeditationEntries,
  initPlayer,
  setPlaylist,
};
