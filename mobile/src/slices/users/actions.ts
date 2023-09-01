import { createAsyncThunk } from '@reduxjs/toolkit';

import { storage, StorageKey } from '#libs/packages/storage/storage';
import { type AsyncThunkConfig } from '#libs/types/types';
import { type UserGetAllResponseDto } from '#packages/users/users';

import { name as sliceName } from './users.slice';

const loadAll = createAsyncThunk<
  UserGetAllResponseDto | null,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
  const { userApi } = extra;

  const hasToken = await storage.has(StorageKey.TOKEN);

  if (hasToken) {
    return await userApi.getAll();
  }

  return null;
});

export { loadAll };
