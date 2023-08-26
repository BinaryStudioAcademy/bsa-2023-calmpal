import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const { reducer, actions, name } = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export { actions, name, reducer };
