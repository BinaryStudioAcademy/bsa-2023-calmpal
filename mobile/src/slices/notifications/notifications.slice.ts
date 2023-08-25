import { createSlice } from '@reduxjs/toolkit';

type State = {
  message: string;
};

const initialState: State = {
  message: '',
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'notification',
  reducers: {},
});

export { actions, name, reducer };
