import { type Step, SurveySteps } from '#packages/survey/survey.js';

import { FeelingsStep } from './feelings-step/feelings-step.js';
import { GoalsStep } from './goals-step/goals-step.js';
import { JournalingExperienceStep } from './journaling-experience-step/journaling-experience-step.js';
import { MeditationExperienceStep } from './meditation-experience-step/meditation-experience-step.js';
import { PreferencesStep } from './preferences-step/preferences-step.js';
import { WorriesStep } from './worries-step/worries-step.js';

type StepsProperties = {
  currentStep: Step;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
};

const renderSteps = ({
  currentStep,
  handleNextStep,
  handlePreviousStep,
  handleSubmit,
}: StepsProperties): React.ReactNode => {
  switch (currentStep) {
    case SurveySteps.PREFERENCES: {
      {
        return <PreferencesStep onNextStep={handleNextStep} />;
      }
    }
    case SurveySteps.FEELINGS: {
      {
        return (
          <FeelingsStep
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
          />
        );
      }
    }
    case SurveySteps.GOALS: {
      {
        return (
          <GoalsStep
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
          />
        );
      }
    }
    case SurveySteps.WORRIES: {
      {
        return (
          <WorriesStep
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
          />
        );
      }
    }
    case SurveySteps.MEDITATION_EXPERIENCE: {
      {
        return (
          <MeditationExperienceStep
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
          />
        );
      }
    }
    case SurveySteps.JOURNALING_EXPERIENCE: {
      {
        return (
          <JournalingExperienceStep
            onSubmit={handleSubmit}
            onPreviousStep={handlePreviousStep}
          />
        );
      }
    }
  }
};

export { renderSteps };
