import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { showErrorNotification } from './actions.js';

type State = {
  message: string;
};

const initialState: State = {
  message: '',
};

const { reducer, actions, name } = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      showErrorNotification,
      (state, action: PayloadAction<string>) => {
        state.message = action.payload;
      },
    );
  },
});

export { actions, name, reducer };
