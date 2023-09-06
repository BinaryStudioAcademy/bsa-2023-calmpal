import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type MeditationCreatePayload,
  type MeditationEntryResponseDto,
} from '#packages/meditation/libs/types/types.js';

import { name as sliceName } from './meditation.slice.js';

const createMeditationEntry = createAsyncThunk<
  MeditationEntryResponseDto,
  MeditationCreatePayload,
  AsyncThunkConfig
>(`${sliceName}/create-meditation-entry`, async (payload, { extra }) => {
  const { meditationApi, filesApi } = extra;
  const file = await filesApi.uploadFile(payload.file);

  return await meditationApi.createMeditationEntry({
    topicName: payload.topicName,
    audioUrl: file.url,
  });
});

export { createMeditationEntry };
