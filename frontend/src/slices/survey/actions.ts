import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import { type SurveyRequestDto } from '#packages/survey/survey.js';

import { name as sliceName } from './survey.slice.js';

const emptyArrayLength = 0;

const createUserSurveyPreferences = createAsyncThunk<
  boolean,
  SurveyRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-user-survey-preferences`, async (payload, { extra }) => {
  const { authApi } = extra;
  const { preferences } = await authApi.createUserSurveyPreferences(payload);

  return preferences.length > emptyArrayLength;
});

const getUserSurveyPreferences = createAsyncThunk<
  boolean,
  { userId: number },
  AsyncThunkConfig
>(`${sliceName}/get-user-survey-preferences`, async (payload, { extra }) => {
  const { authApi } = extra;
  const { preferences } = await authApi.getUserSurveyPreferences(payload);

  return preferences.length > emptyArrayLength;
});

export { createUserSurveyPreferences, getUserSurveyPreferences };
