import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '#libs/enums/enums.js';
import { StorageKey } from '#libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import { type UserDeleteRequestDto } from '#packages/users/users.js';
import { actions as appActions } from '#slices/app/app.js';

import { name as sliceName } from './users.slice.js';

const deleteUser = createAsyncThunk<
  unknown,
  UserDeleteRequestDto,
  AsyncThunkConfig
>(`${sliceName}/deleteUser`, async (deletePayload, { extra, dispatch }) => {
  const { usersApi, storage } = extra;
  const { id } = await usersApi.deleteUser(deletePayload);

  await storage.drop(StorageKey.TOKEN);

  dispatch(appActions.navigate(AppRoute.SIGN_IN));

  return id;
});

export { deleteUser };
