import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { AppRoute } from '#libs/enums/app-route.enum.js';
import { getAuthenticatedUser, signIn, signUp } from '#slices/auth/actions.js';

type State = {
  redirectTo: string | null;
};

const initialState: State = {
  redirectTo: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'app',
  reducers: {
    navigate: (state, action: PayloadAction<null>) => {
      state.redirectTo = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signUp.fulfilled, (state) => {
      state.redirectTo = AppRoute.ROOT;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.redirectTo = AppRoute.ROOT;
    });
    builder.addCase(getAuthenticatedUser.fulfilled, (state) => {
      state.redirectTo = AppRoute.ROOT;
    });
  },
});

export { actions, name, reducer };
