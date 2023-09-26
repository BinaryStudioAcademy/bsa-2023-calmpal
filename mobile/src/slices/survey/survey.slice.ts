import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type SurveyState = {
  preferences: string[];
  feelings: string[];
  goals: string[];
  worries: string[];
  meditationExperience: string;
  journalingExperience: string;
};

const initialState: SurveyState = {
  preferences: [],
  feelings: [],
  goals: [],
  worries: [],
  meditationExperience: '',
  journalingExperience: '',
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'survey',
  reducers: {
    updateSurveyData: (state, action: PayloadAction<Partial<SurveyState>>) => {
      return { ...state, ...action.payload };
    },
    resetSurveyData: () => {
      return initialState;
    },
  },
});

export { actions, name, reducer };
