import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'app',
  reducers: {},
});

export { actions, name, reducer };
