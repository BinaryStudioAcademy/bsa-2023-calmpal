import { createAsyncThunk } from '@reduxjs/toolkit';

import { storage, StorageKey } from '#libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '#packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

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

export { getAuthenticatedUser, signIn, signUp };
