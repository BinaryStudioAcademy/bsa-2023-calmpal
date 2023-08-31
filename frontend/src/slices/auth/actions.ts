import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '#libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import { type SurveyRequestDto } from '#packages/survey/survey.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '#packages/users/users.js';

import { name as sliceName } from './auth.slice.js';
import { EMPTY_ARRAY_LENGTH } from './libs/constants.js';

const signUp = createAsyncThunk<
  UserAuthResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(registerPayload);
  await storage.set(StorageKey.TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UserAuthResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signIn(loginPayload);

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

const createUserSurvey = createAsyncThunk<
  boolean,
  SurveyRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-user-survey-preferences`, async (payload, { extra }) => {
  const { authApi } = extra;
  const { preferences } = await authApi.createUserSurvey(payload);

  return preferences.length > EMPTY_ARRAY_LENGTH;
});

export { createUserSurvey, getAuthenticatedUser, signIn, signUp };
