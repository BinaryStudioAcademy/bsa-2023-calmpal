import { useAppDispatch, useCallback } from '#libs/hooks/hooks.js';
import { actions } from '#slices/survey/survey.js';

import { type SurveyStepsType } from '../../types/types.js';

type UseStateSurvey = Record<string, (value: string[] | string) => void>;

const SURVEY_ACTIONS = {
  feelings: 'setFeelings',
  goals: 'setGoals',
  worries: 'setWorries',
  preferences: 'setPreferences',
  meditationExperience: 'setMeditationExperience',
  journalingExperience: 'setJournalingExperience',
} as const;

type DispatchSurveyPayload = string[] & string;

const useStateSurvey = (surveyStep: SurveyStepsType): UseStateSurvey => {
  const dispatch = useAppDispatch();

  const setStateValue = useCallback(
    (value: string[] | string): void => {
      dispatch(
        actions[SURVEY_ACTIONS[surveyStep]](value as DispatchSurveyPayload),
      );
    },
    [dispatch, surveyStep],
  );

  return {
    setStateValue,
  };
};

export { useStateSurvey };
