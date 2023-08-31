import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '#libs/enums/enums.js';
import { storage, StorageKey } from '#libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '#packages/users/users.js';
import { actions as appActions } from '#slices/app/app.js';

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

const getAuthenticatedUser = createAsyncThunk<
  UserAuthResponseDto | null,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra, dispatch }) => {
  const { authApi } = extra;
  const hasToken = await storage.has(StorageKey.TOKEN);
  if (hasToken) {
    dispatch(appActions.navigate(AppRoute.ROOT));

    return await authApi.getAuthenticatedUser();
  }

  return null;
});

export { getAuthenticatedUser, signIn, signUp };
