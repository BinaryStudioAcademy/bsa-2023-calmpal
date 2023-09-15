import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions, name } = createSlice({
  initialState: {},
  name: 'meditation',
  reducers: {},
});

export { actions, name, reducer };
