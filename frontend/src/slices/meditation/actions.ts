import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type MeditationEntryCreatePayload,
  type MeditationEntryCreateResponseDto,
} from '#packages/meditation/meditation.js';

import { name as sliceName } from './meditation.slice.js';

const createMeditationEntry = createAsyncThunk<
  MeditationEntryCreateResponseDto,
  MeditationEntryCreatePayload,
  AsyncThunkConfig
>(`${sliceName}/create-meditation-entry`, async (payload, { extra }) => {
  const { meditationApi, filesApi, notification } = extra;

  const file = await filesApi.uploadFile(payload.file);
  const item = await meditationApi.createMeditationEntry({
    mediaUrl: file.url,
    contentType: file.contentType,
  });

  notification.success('Meditation was added.');

  return item;
});

export { createMeditationEntry };
