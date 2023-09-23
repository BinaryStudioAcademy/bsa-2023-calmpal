import { type Step, Steps } from '#packages/survey/survey.js';

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
    case Steps.PREFERENCES: {
      {
        return <PreferencesStep handleNextStep={handleNextStep} />;
      }
    }
    case Steps.FEELINGS: {
      {
        return (
          <FeelingsStep
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      }
    }
    case Steps.GOALS: {
      {
        return (
          <GoalsStep
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      }
    }
    case Steps.WORRIES: {
      {
        return (
          <WorriesStep
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      }
    }
    case Steps.MEDITATION_EXPERIENCE: {
      {
        return (
          <MeditationExperienceStep
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      }
    }
    case Steps.JOURNALING_EXPERIENCE: {
      {
        return (
          <JournalingExperienceStep
            onSubmit={handleSubmit}
            handlePreviousStep={handlePreviousStep}
          />
        );
      }
    }
  }
};

export { renderSteps };
