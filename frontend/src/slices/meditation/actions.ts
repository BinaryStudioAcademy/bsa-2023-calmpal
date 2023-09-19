import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type MeditationEntryCreateRequestDto,
  type MeditationEntryCreateResponseDto,
} from '#packages/meditation/meditation.js';
import { appActions } from '#slices/app/app-notification.js';

import { name as sliceName } from './meditation.slice.js';

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

export { createMeditationEntry };
