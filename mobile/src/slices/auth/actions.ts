import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '#libs/packages/storage/storage';
import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type UserDetailsDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/users';

import { name as sliceName } from './auth.slice';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (signUpPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(signUpPayload);
});

const signIn = createAsyncThunk<
  UserDetailsDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signIn(signInPayload);
  await storage.set(StorageKey.TOKEN, token);
  return user;
});

export { signIn, signUp };
