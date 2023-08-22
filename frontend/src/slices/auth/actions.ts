import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type UserDetailsDto,
  type UserSignUpRequestDto,
} from '#packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserDetailsDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(
  `${sliceName}/sign-up`,
  async (registerPayload, { extra, rejectWithValue }) => {
    try {
      const { authApi, storage } = extra;
      const { user, token } = await authApi.signUp(registerPayload);
      await storage.set('token', token);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export { signUp };
