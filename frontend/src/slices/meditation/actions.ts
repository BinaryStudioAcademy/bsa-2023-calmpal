import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import { type MeditationEntryCreateResponseDto } from '#packages/meditation/meditation.js';

import { name as sliceName } from './meditation.slice.js';

const createMeditationEntry = createAsyncThunk<
  MeditationEntryCreateResponseDto,
  File,
  AsyncThunkConfig
>(`${sliceName}/create-meditation-entry`, async (payload, { extra }) => {
  const { meditationApi, notification } = extra;
  const item = await meditationApi.createMeditationEntry(payload);

  notification.success('Meditation was added.');

  return item;
});

export { createMeditationEntry };
