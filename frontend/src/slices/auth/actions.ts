import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type UserDetailsDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(registerPayload);
});

const signIn = createAsyncThunk<
  UserDetailsDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { rejectWithValue, extra }) => {
  const { authApi, storage } = extra;

  try {
    const userData = await authApi.signIn(loginPayload);
    await storage.set('token', userData.token);

    return userData.user;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export { signIn, signUp };
