import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '#libs/packages/storage/storage';
import { type AsyncThunkConfig } from '#libs/types/types';
import { type SurveyRequestDto } from '#packages/survey/survey';
import {
  type UserAuthResponseDto,
  type UserSignUpRequestDto,
} from '#packages/users/users';

import { name as sliceName } from './auth.slice';
import { EMPTY_ARRAY_LENGTH } from './libs/constants';

const signUp = createAsyncThunk<
  UserAuthResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (signUpPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(signUpPayload);

  await storage.set(StorageKey.TOKEN, token);

  return user;
});

const getAuthenticatedUser = createAsyncThunk<
  UserAuthResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, (_, { extra }) => {
  const { authApi } = extra;

  return authApi.getAuthenticatedUser();
});

const createUserSurveyPreferences = createAsyncThunk<
  boolean,
  SurveyRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-user-survey-preferences`, async (payload, { extra }) => {
  const { authApi } = extra;
  const { preferences } = await authApi.createUserSurveyPreferences(payload);

  return preferences.length > EMPTY_ARRAY_LENGTH;
});

export { createUserSurveyPreferences, getAuthenticatedUser, signUp };
