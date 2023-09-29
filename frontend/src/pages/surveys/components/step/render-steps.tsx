import { useAppDispatch, useCallback } from '#libs/hooks/hooks.js';
import { type StepsType } from '#packages/survey/libs/types/types.js';
import { SurveyStep } from '#packages/survey/survey.js';
import {
  FEELINGS_CATEGORIES,
  GOALS_CATEGORIES,
  JOURNALING_EXPERIENCE_CATEGORIES,
  MEDITATION_EXPERIENCE_CATEGORIES,
  PREFERENCES_CATEGORIES,
  WORRIES_CATEGORIES,
} from '#pages/surveys/libs/constants/constants.js';
import { actions } from '#slices/survey/survey.js';

import { Step } from './step.js';

type StepsProperties = {
  currentStep: StepsType;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSubmit: () => void;
};

const RenderSteps: React.FC<StepsProperties> = ({
  currentStep,
  onNextStep,
  onPreviousStep,
  onSubmit,
}): React.ReactNode => {
  const dispatch = useAppDispatch();

  const setPreference = useCallback(
    (preferences: string[] | string): void => {
      if (Array.isArray(preferences)) {
        dispatch(actions.setPreferences(preferences));
      }
    },
    [dispatch],
  );

  const setFeelings = useCallback(
    (feelings: string[] | string): void => {
      if (Array.isArray(feelings)) {
        dispatch(actions.setFeelings(feelings));
      }
    },
    [dispatch],
  );

  const setGoals = useCallback(
    (goals: string[] | string): void => {
      if (Array.isArray(goals)) {
        dispatch(actions.setGoals(goals));
      }
    },
    [dispatch],
  );

  const setWorries = useCallback(
    (worries: string[] | string): void => {
      if (Array.isArray(worries)) {
        dispatch(actions.setWorries(worries));
      }
    },
    [dispatch],
  );

  const setMeditationExperience = useCallback(
    (meditationExperience: string[] | string): void => {
      if (typeof meditationExperience === 'string') {
        dispatch(actions.setMeditationExperience(meditationExperience));
      }
    },
    [dispatch],
  );

  const setJournalingExperience = useCallback(
    (journalingExperience: string[] | string): void => {
      if (typeof journalingExperience === 'string') {
        dispatch(actions.setJournalingExperience(journalingExperience));
      }
    },
    [dispatch],
  );

  switch (currentStep) {
    case SurveyStep.PREFERENCES: {
      return (
        <Step
          key={currentStep}
          stepCategories={PREFERENCES_CATEGORIES}
          question="What can we help you with?"
          step={currentStep}
          type="checkbox"
          onNextStep={onNextStep}
          onSetState={setPreference}
        />
      );
    }
    case SurveyStep.FEELINGS: {
      return (
        <Step
          key={currentStep}
          stepCategories={FEELINGS_CATEGORIES}
          question="How have you been feeling lately?"
          step={currentStep}
          type="checkbox"
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
          onSetState={setFeelings}
        />
      );
    }
    case SurveyStep.GOALS: {
      return (
        <Step
          key={currentStep}
          stepCategories={GOALS_CATEGORIES}
          question="What do you want to achieve with this Serenity?"
          step={currentStep}
          type="checkbox"
          onSubmit={onNextStep}
          onPreviousStep={onPreviousStep}
          onSetState={setGoals}
        />
      );
    }
    case SurveyStep.WORRIES: {
      return (
        <Step
          key={currentStep}
          stepCategories={WORRIES_CATEGORIES}
          question="What do you usually worry about most?"
          step={currentStep}
          type="checkbox"
          onSubmit={onNextStep}
          onPreviousStep={onPreviousStep}
          onSetState={setWorries}
        />
      );
    }
    case SurveyStep.MEDITATION_EXPERIENCE: {
      return (
        <Step
          key={currentStep}
          stepCategories={MEDITATION_EXPERIENCE_CATEGORIES}
          question="What is your experience with meditation?"
          step={currentStep}
          type="radio"
          onSubmit={onNextStep}
          onPreviousStep={onPreviousStep}
          onSetState={setMeditationExperience}
        />
      );
    }
    case SurveyStep.JOURNALING_EXPERIENCE: {
      return (
        <Step
          key={currentStep}
          stepCategories={JOURNALING_EXPERIENCE_CATEGORIES}
          question="What is your experience with journaling?"
          step={currentStep}
          type="radio"
          onSubmit={onSubmit}
          onPreviousStep={onPreviousStep}
          onSetState={setJournalingExperience}
        />
      );
    }
  }
};

export { RenderSteps };
