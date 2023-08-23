import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '#libs/packages/storage/storage';
import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type UserAuthResponseDto,
  type UserSignUpRequestDto,
} from '#packages/users/users';

import { name as sliceName } from './auth.slice';

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

export { signUp };
