import {
  type RenderSteps,
  type StepsType,
  type UseSurveyState,
} from '#packages/survey/survey.js';
import { useStateSurvey } from '#packages/survey/survey.js';
import { STEPS_CONFIGURATION } from '#pages/surveys/libs/constants/constants.js';

import { Step } from './step.js';

type Properties = {
  currentStep: StepsType;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSubmit: () => void;
};

const RenderSteps: React.FC<Properties> = ({
  currentStep,
  onNextStep,
  onPreviousStep,
  onSubmit,
}): React.ReactNode => {
  const setState = useStateSurvey(currentStep)[
    'setStateValue'
  ] as UseSurveyState;

  const { stepCategories, question, type, next, previous, submit } =
    STEPS_CONFIGURATION.get(currentStep) as RenderSteps;

  return (
    <Step
      key={currentStep}
      stepCategories={stepCategories}
      question={question}
      step={currentStep}
      type={type}
      onNextStep={next ? onNextStep : undefined}
      onPreviousStep={previous ? onPreviousStep : undefined}
      onSubmit={submit ? onSubmit : undefined}
      onSetState={setState}
    />
  );
};

export { RenderSteps };
