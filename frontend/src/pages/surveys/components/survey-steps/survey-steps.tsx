import {
  type StepConfiguration,
  type SurveyStepsType,
  type UseSurveyState,
} from '#packages/survey/survey.js';
import { useStateSurvey } from '#packages/survey/survey.js';
import { STEPS_CONFIGURATION } from '#pages/surveys/libs/constants/constants.js';

import { Step } from '../step/step.js';

type Properties = {
  currentStep: SurveyStepsType;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSubmit: () => void;
};

const SurveySteps: React.FC<Properties> = ({
  currentStep,
  onNextStep,
  onPreviousStep,
  onSubmit,
}) => {
  const { setStateValue } = useStateSurvey(currentStep);

  const { stepCategories, question, type, next, previous, submit } =
    STEPS_CONFIGURATION.get(currentStep) as StepConfiguration;

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
      onSetState={setStateValue as UseSurveyState}
    />
  );
};

export { SurveySteps };
