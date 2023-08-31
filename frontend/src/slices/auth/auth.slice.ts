import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import { getAuthenticatedUser, signIn, signUp } from './actions.js';

type State = {
  authenticatedUser: UserAuthResponseDto | null;
  authenticatedUserDataStatus: ValueOf<typeof DataStatus>;
  authDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  authenticatedUser: null,
  authenticatedUserDataStatus: DataStatus.IDLE,
  authDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.authenticatedUserDataStatus = DataStatus.PENDING;
      state.authDataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.authenticatedUserDataStatus = DataStatus.FULFILLED;
      state.authDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.authenticatedUser = null;
      state.authenticatedUserDataStatus = DataStatus.REJECTED;
      state.authDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(signIn.pending, (state) => {
      state.authenticatedUserDataStatus = DataStatus.PENDING;
      state.authDataStatus = DataStatus.PENDING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.authenticatedUserDataStatus = DataStatus.FULFILLED;
      state.authDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.authenticatedUser = null;
      state.authenticatedUserDataStatus = DataStatus.REJECTED;
      state.authDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getAuthenticatedUser.pending, (state) => {
      state.authenticatedUserDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.authenticatedUserDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAuthenticatedUser.rejected, (state) => {
      state.authenticatedUserDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
