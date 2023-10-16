import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '~/libs/enums/enums.js';
import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { actions as appActions } from '~/slices/app/app.js';

import { name as sliceName } from './users.slice.js';

const deleteUser = createAsyncThunk<boolean, number, AsyncThunkConfig>(
  `${sliceName}/deleteUser`,
  async (id, { extra, dispatch }) => {
    const { authApi, storage } = extra;
    const isDeleted = await authApi.deleteAuthenticatedUser(id);

    await storage.drop(StorageKey.TOKEN);

    dispatch(appActions.navigate(AppRoute.SIGN_IN));

    return isDeleted;
  },
);

export { deleteUser };
