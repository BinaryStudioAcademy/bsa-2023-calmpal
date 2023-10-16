import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type MeditationEntryCreateRequestDto,
  type MeditationEntryCreateResponseDto,
  type MeditationEntryGetAllResponseDto,
} from '~/packages/meditation/meditation.js';
import { appActions } from '~/slices/app/app-notification.js';

import { name as sliceName } from './meditation.slice.js';

const createMeditationEntry = createAsyncThunk<
  MeditationEntryCreateResponseDto,
  MeditationEntryCreateRequestDto,
  AsyncThunkConfig
>(
  `${sliceName}/create-meditation-entry`,
  async (payload, { extra, dispatch }) => {
    const { meditationApi } = extra;
    const item = await meditationApi.createEntry(payload);

    void dispatch(
      appActions.notify({
        type: 'success',
        message: `Meditation ${payload.name} was added.`,
      }),
    );

    return item;
  },
);

const getAllMeditationEntries = createAsyncThunk<
  MeditationEntryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-meditation-entries`, async (_, { extra }) => {
  const { meditationApi } = extra;

  return await meditationApi.getAllEntries();
});

export { createMeditationEntry, getAllMeditationEntries };
