import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
    navigate: (state, action: PayloadAction<string | null>) => {
      state.redirectTo = action.payload;
    },
  },
});

export { actions, name, reducer };
