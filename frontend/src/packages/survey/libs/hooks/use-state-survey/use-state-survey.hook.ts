// import { useAppDispatch, useCallback } from '#libs/hooks/hooks.js';
// import { actions } from '#slices/survey/survey.js';

// type UseStateSurvey = {
//   setPreference: (preferences: string[] | string) => void;
//   setFeelings: (feelings: string[] | string) => void;
//   setGoals: (goals: string[] | string) => void;
//   setWorries: (worries: string[] | string) => void;
//   setMeditationExperience: (meditationExperience: string[] | string) => void;
//   setJournalingExperience: (journalingExperience: string[] | string) => void;
// };

// const useStateSurvey = (): UseStateSurvey => {
//   const dispatch = useAppDispatch();

//   const setPreference = useCallback(
//     (preferences: string[] | string): void => {
//       if (Array.isArray(preferences)) {
//         dispatch(actions.setPreferences(preferences));
//       }
//     },
//     [dispatch],
//   );

//   const setFeelings = useCallback(
//     (feelings: string[] | string): void => {
//       if (Array.isArray(feelings)) {
//         dispatch(actions.setFeelings(feelings));
//       }
//     },
//     [dispatch],
//   );

//   const setGoals = useCallback(
//     (goals: string[] | string): void => {
//       if (Array.isArray(goals)) {
//         dispatch(actions.setGoals(goals));
//       }
//     },
//     [dispatch],
//   );

//   const setWorries = useCallback(
//     (worries: string[] | string): void => {
//       if (Array.isArray(worries)) {
//         dispatch(actions.setWorries(worries));
//       }
//     },
//     [dispatch],
//   );

//   const setMeditationExperience = useCallback(
//     (meditationExperience: string[] | string): void => {
//       if (typeof meditationExperience === 'string') {
//         dispatch(actions.setMeditationExperience(meditationExperience));
//       }
//     },
//     [dispatch],
//   );

//   const setJournalingExperience = useCallback(
//     (journalingExperience: string[] | string): void => {
//       if (typeof journalingExperience === 'string') {
//         dispatch(actions.setJournalingExperience(journalingExperience));
//       }
//     },
//     [dispatch],
//   );

//   return {
//     setPreference,
//     setFeelings,
//     setGoals,
//     setWorries,
//     setMeditationExperience,
//     setJournalingExperience,
//   };
// };
// export { useStateSurvey };

import { useAppDispatch, useCallback } from '#libs/hooks/hooks.js';
import { actions } from '#slices/survey/survey.js';

import { type StepsType } from '../../types/types.js';

type UseStateSurvey = Record<string, (value: string[] | string) => void>;

const SURVEY_ACTIONS = {
  feelings: 'setFeelings',
  goals: 'setGoals',
  worries: 'setWorries',
  preferences: 'setPreferences',
  meditationExperience: 'setMeditationExperience',
  journalingExperience: 'setJournalingExperience',
} as const;

const useStateSurvey = (surveyStep: StepsType): UseStateSurvey => {
  const dispatch = useAppDispatch();

  const setStateValue = useCallback(
    (value: string[] | string): void => {
      dispatch(actions[SURVEY_ACTIONS[surveyStep]](value as string[] & string));
    },
    [dispatch, surveyStep],
  );

  return {
    setStateValue,
  };
};

export { useStateSurvey };
