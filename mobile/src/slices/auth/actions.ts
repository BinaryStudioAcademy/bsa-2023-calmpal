import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type UserDetailsDto,
  type UserSignUpRequestDto,
} from '#packages/users/users';

import { name as sliceName } from './auth.slice';

const signUp = createAsyncThunk<
  UserDetailsDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (signUpPayload, { extra, rejectWithValue }) => {
  try {
    const { authApi, storage } = extra;
    const { user, token } = await authApi.signUp(signUpPayload);
    await storage.set('token', token);
    return user;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export { signUp };
