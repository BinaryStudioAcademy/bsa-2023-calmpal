import { createAsyncThunk } from '@reduxjs/toolkit';

import { EMPTY_ARRAY_LENGTH } from '~/libs/constants/constants.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { storage, StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type SurveyRequestDto } from '~/packages/survey/survey.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';
import { actions as appActions } from '~/slices/app/app.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserAuthResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra, dispatch }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(registerPayload);
  await storage.set(StorageKey.TOKEN, token);

  dispatch(appActions.navigate(AppRoute.ROOT));

  return user;
});

const signIn = createAsyncThunk<
  UserAuthResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra, dispatch }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signIn(loginPayload);
  await storage.set(StorageKey.TOKEN, token);

  dispatch(appActions.navigate(AppRoute.ROOT));

  return user;
});

const signOut = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
  `${sliceName}/sign-out`,
  async (_, { extra }) => {
    const { storage } = extra;
    await storage.drop(StorageKey.TOKEN);
  },
);

const getAuthenticatedUser = createAsyncThunk<
  UserAuthResponseDto | null,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
  const { authApi } = extra;
  const hasToken = await storage.has(StorageKey.TOKEN);

  if (hasToken) {
    return await authApi.getAuthenticatedUser();
  }

  return null;
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

export { createUserSurvey, getAuthenticatedUser, signIn, signOut, signUp };
