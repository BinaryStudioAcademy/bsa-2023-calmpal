import { useAppDispatch, useAppSelector } from '#libs/hooks/hooks.js';
import { type SurveyState } from '#packages/survey/libs/types/types.js';
import { actions } from '#slices/survey/survey.js';

type SurveyHook = {
  feelings: string[];
  goals: string[];
  journalingExperience: string;
  meditationExperience: string;
  preferences: string[];
  survey: SurveyState;
  setFeelings: (feelings: string[]) => void;
  setGoals: (goals: string[]) => void;
  setJournalingExperience: (journalingExperience: string) => void;
  setMeditationExperience: (meditationExperience: string) => void;
  setPreferences: (preferences: string[]) => void;
  setWorries: (worries: string[]) => void;
  worries: string[];
};

const useSurvey = (): SurveyHook => {
  const survey = useAppSelector((state) => {
    return state.survey;
  });
  const preferences = useAppSelector((state) => {
    return state.survey.preferences;
  });
  const feelings = useAppSelector((state) => {
    return state.survey.feelings;
  });
  const goals = useAppSelector((state) => {
    return state.survey.goals;
  });
  const worries = useAppSelector((state) => {
    return state.survey.worries;
  });
  const meditationExperience = useAppSelector((state) => {
    return state.survey.meditationExperience;
  });
  const journalingExperience = useAppSelector((state) => {
    return state.survey.journalingExperience;
  });

  const dispatch = useAppDispatch();

  const setPreferences = (preferences: string[]): void => {
    dispatch(actions.setPreferences(preferences));
  };

  const setFeelings = (feelings: string[]): void => {
    dispatch(actions.setFeelings(feelings));
  };

  const setGoals = (goals: string[]): void => {
    dispatch(actions.setGoals(goals));
  };
  const setWorries = (worries: string[]): void => {
    dispatch(actions.setWorries(worries));
  };
  const setMeditationExperience = (meditationExperience: string): void => {
    dispatch(actions.setMeditationExperience(meditationExperience));
  };

  const setJournalingExperience = (journalingExperience: string): void => {
    dispatch(actions.setJournalingExperience(journalingExperience));
  };

  return {
    survey,
    feelings,
    goals,
    journalingExperience,
    meditationExperience,
    preferences,
    setFeelings,
    setGoals,
    setJournalingExperience,
    setMeditationExperience,
    setPreferences,
    setWorries,
    worries,
  };
};

export { useSurvey };
