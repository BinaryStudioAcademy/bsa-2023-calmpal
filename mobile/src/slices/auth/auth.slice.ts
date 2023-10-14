import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums';
import { type ValueOf } from '~/libs/types/types';
import { type UserAuthResponseDto } from '~/packages/users/users';

import {
  createUserSurvey,
  getAuthenticatedUser,
  signIn,
  signOut,
  signUp,
} from './actions';

type State = {
  authenticatedUser: UserAuthResponseDto | null;
  authenticatedUserDataStatus: ValueOf<typeof DataStatus>;
  dataStatus: ValueOf<typeof DataStatus>;
  surveyPreferencesDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  authenticatedUser: null,
  authenticatedUserDataStatus: DataStatus.IDLE,
  dataStatus: DataStatus.IDLE,
  surveyPreferencesDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.authenticatedUser = action.payload;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
      state.authenticatedUser = null;
    });

    builder.addCase(signUp.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.authenticatedUser = null;
      state.dataStatus = DataStatus.REJECTED;
    });

    builder.addCase(signOut.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.authenticatedUser = null;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signOut.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
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

    builder.addCase(createUserSurvey.pending, (state) => {
      state.surveyPreferencesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(createUserSurvey.fulfilled, (state, action) => {
      (state.authenticatedUser as UserAuthResponseDto).isSurveyCompleted =
        action.payload;

      state.surveyPreferencesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createUserSurvey.rejected, (state) => {
      state.surveyPreferencesDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
