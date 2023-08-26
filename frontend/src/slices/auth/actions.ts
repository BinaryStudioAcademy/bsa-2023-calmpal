import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '#libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type UserAuthResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const response = await authApi.signUp(registerPayload);

  await storage.set(StorageKey.TOKEN, response.token);

  return response;
});

const getAuthenticatedUser = createAsyncThunk<
  UserAuthResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, (_, { extra }) => {
  const { authApi } = extra;

  return authApi.getAuthenticatedUser();
});

export { getAuthenticatedUser, signUp };
