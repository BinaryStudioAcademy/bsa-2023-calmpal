import { Button, Checkbox } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  //getSurveyCategories,
  meditationExperienceStepInputValidationSchema,
} from '#packages/survey/survey.js';
import {
  MEDITATION_EXPERIENCE_CATEGORIES,
  MEDITATION_EXPERIENCE_QUESTION,
} from '#pages/surveys/libs/constants.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (options: string[]) => void;
  isNextStepDisabled: boolean;
  setIsNextStepDisabled: (isDisabled: boolean) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

type SurveyInputDto = {
  meditationExperience: string[];
};

const MeditationExperienceStep: React.FC<Properties> = ({
  //onSubmit,
  isNextStepDisabled,
  setIsNextStepDisabled,
  handleNextStep,
  handlePreviousStep,
}) => {
  const { control, isValid, handleSubmit } = useAppForm<SurveyInputDto>({
    defaultValues: { meditationExperience: [] },
    validationSchema: meditationExperienceStepInputValidationSchema,
  });
  const {
    field: { onChange: onCategoryChange },
  } = useFormController({
    name: 'meditationExperience',
    control,
  });

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        onCategoryChange([category]);
      };
    },
    [onCategoryChange],
  );

  // const handlePreferencesSubmit = useCallback(
  //   (payload: SurveyInputDto) => {
  //     onSubmit(getSurveyCategories(payload));
  //   },
  //   [onSubmit],
  // );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      // void handleSubmit(handlePreferencesSubmit)(event_);
      void handleSubmit(handleNextStep)(event_);
    },
    //[handleSubmit, handlePreferencesSubmit],
    [handleSubmit, handleNextStep],
  );

  useEffect(() => {
    setIsNextStepDisabled(!isValid);
  }, [isValid, setIsNextStepDisabled]);

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>{MEDITATION_EXPERIENCE_QUESTION}</div>

      <div className={styles['select']}>
        {MEDITATION_EXPERIENCE_CATEGORIES.map((category) => {
          return (
            <Checkbox
              key={category}
              label={category}
              type="radio"
              onChange={handleFieldChange(category)}
            />
          );
        })}
      </div>

      <Button
        type="submit"
        label="Continue"
        style="secondary"
        isDisabled={isNextStepDisabled}
      />

      <Button label="Back" style="outlined" onClick={handlePreviousStep} />
    </form>
  );
};

export { MeditationExperienceStep };
