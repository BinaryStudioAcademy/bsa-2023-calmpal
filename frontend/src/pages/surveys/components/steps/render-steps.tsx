import { LAST_INDEX } from '#libs/constants/index.constant.js';
import { useAppDispatch, useCallback } from '#libs/hooks/hooks.js';
import { type Step, SurveySteps } from '#packages/survey/survey.js';
import { actions } from '#slices/survey/survey.js';

import { FeelingsStep } from './feelings-step/feelings-step.js';
import { GoalsStep } from './goals-step/goals-step.js';
import { JournalingExperienceStep } from './journaling-experience-step/journaling-experience-step.js';
import { MeditationExperienceStep } from './meditation-experience-step/meditation-experience-step.js';
import { PreferencesStep } from './preferences-step/preferences-step.js';
import { WorriesStep } from './worries-step/worries-step.js';

const hasOther = (category: string[]): boolean => {
  return category.includes('Other');
};

const getOtherDefault = (categories: string[]): string => {
  return hasOther(categories) && categories.at(LAST_INDEX) !== 'Other'
    ? (categories.at(LAST_INDEX) as string)
    : '';
};

const getOthersCategories = (
  categories: string[],
  payload: string[],
): string[] => {
  return payload.filter((category) => {
    return !categories.includes(category);
  });
};

type StepsProperties = {
  currentStep: Step;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSubmit: () => void;
};

const useRenderSteps: React.FC<StepsProperties> = ({
  currentStep,
  onNextStep,
  onPreviousStep,
  onSubmit,
}): React.ReactNode => {
  const dispatch = useAppDispatch();

  const setPreference = useCallback(
    (preferences: string[]): void => {
      dispatch(actions.setPreferences(preferences));
    },
    [dispatch],
  );

  const setFeelings = useCallback(
    (feelings: string[]): void => {
      dispatch(actions.setFeelings(feelings));
    },
    [dispatch],
  );

  const setGoals = useCallback(
    (goals: string[]): void => {
      dispatch(actions.setGoals(goals));
    },
    [dispatch],
  );
  const setWorries = useCallback(
    (worries: string[]): void => {
      dispatch(actions.setWorries(worries));
    },
    [dispatch],
  );
  const setMeditationExperience = useCallback(
    (meditationExperience: string): void => {
      dispatch(actions.setMeditationExperience(meditationExperience));
    },
    [dispatch],
  );

  const setJournalingExperience = useCallback(
    (journalingExperience: string): void => {
      dispatch(actions.setJournalingExperience(journalingExperience));
    },
    [dispatch],
  );

  const onOther = {
    getOtherDefault,
    getOthersCategories,
    hasOther,
  };
  switch (currentStep) {
    case SurveySteps.PREFERENCES: {
      {
        return (
          <PreferencesStep
            onNextStep={onNextStep}
            onSetPreferences={setPreference}
            onOther={onOther}
          />
        );
      }
    }
    case SurveySteps.FEELINGS: {
      {
        return (
          <FeelingsStep
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
            onSetFeelings={setFeelings}
          />
        );
      }
    }
    case SurveySteps.GOALS: {
      {
        return (
          <GoalsStep
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
            onSetGoals={setGoals}
            onOther={onOther}
          />
        );
      }
    }
    case SurveySteps.WORRIES: {
      {
        return (
          <WorriesStep
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
            onSetWorries={setWorries}
            onOther={onOther}
          />
        );
      }
    }
    case SurveySteps.MEDITATION_EXPERIENCE: {
      {
        return (
          <MeditationExperienceStep
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
            onSetMeditationExperience={setMeditationExperience}
          />
        );
      }
    }
    case SurveySteps.JOURNALING_EXPERIENCE: {
      {
        return (
          <JournalingExperienceStep
            onSubmit={onSubmit}
            onPreviousStep={onPreviousStep}
            onSetJournalingExperience={setJournalingExperience}
          />
        );
      }
    }
  }
};

export { useRenderSteps as RenderSteps };
