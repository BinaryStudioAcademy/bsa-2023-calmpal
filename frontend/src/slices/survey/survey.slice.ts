import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import {
  createUserSurveyPreferences,
  getUserSurveyPreferences,
} from './actions.js';

type State = {
  isSurveyCompleted: boolean;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  isSurveyCompleted: false,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'survey',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUserSurveyPreferences.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(createUserSurveyPreferences.fulfilled, (state, action) => {
      state.isSurveyCompleted = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createUserSurveyPreferences.rejected, (state) => {
      state.isSurveyCompleted = false;
      state.dataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getUserSurveyPreferences.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getUserSurveyPreferences.fulfilled, (state, action) => {
      state.isSurveyCompleted = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getUserSurveyPreferences.rejected, (state) => {
      state.isSurveyCompleted = false;
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
