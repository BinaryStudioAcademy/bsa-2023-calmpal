import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums';
import { type ValueOf } from '#libs/types/types';
import { type UserDetailsDto } from '#packages/users/users';

import { signUp } from './actions';

type State = {
  user: UserDetailsDto | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  user: null,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.user = null;
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
