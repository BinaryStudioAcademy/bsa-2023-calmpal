import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type SurveyState } from '#packages/survey/libs/types/survey-state.type.js';

const initialState: SurveyState = {
  preferences: [],
  feelings: [],
  goals: [],
  worries: [],
  meditationExperience: '',
  journalingExperience: '',
};

const { reducer, actions, name } = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<string[]>) => {
      state.preferences = action.payload;
    },
    setFeelings: (state, action: PayloadAction<string[]>) => {
      state.feelings = action.payload;
    },
    setGoals: (state, action: PayloadAction<string[]>) => {
      state.goals = action.payload;
    },
    setWorries: (state, action: PayloadAction<string[]>) => {
      state.worries = action.payload;
    },
    setMeditationExperience: (state, action: PayloadAction<string>) => {
      state.meditationExperience = action.payload;
    },
    setJournalingExperience: (state, action: PayloadAction<string>) => {
      state.journalingExperience = action.payload;
    },
  },
});

export { actions, name, reducer };
