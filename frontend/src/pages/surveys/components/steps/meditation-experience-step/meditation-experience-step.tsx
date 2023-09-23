import { Button, Checkbox } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type MeditationExperienceInputDto } from '#packages/survey/libs/types/types.js';
import { meditationExperienceStepInputValidationSchema } from '#packages/survey/survey.js';
import {
  MEDITATION_EXPERIENCE_CATEGORIES,
  MEDITATION_EXPERIENCE_QUESTION,
} from '#pages/surveys/libs/constants.js';
import { useSurvey } from '#pages/surveys/libs/hooks/survey.hooks.js';

import styles from '../styles.module.scss';

type Properties = {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

const MeditationExperienceStep: React.FC<Properties> = ({
  handleNextStep,
  handlePreviousStep,
}) => {
  const { meditationExperience, setMeditationExperience } = useSurvey();

  const { control, isValid, handleSubmit } =
    useAppForm<MeditationExperienceInputDto>({
      defaultValues: { meditationExperience: meditationExperience },
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
        setMeditationExperience(category);
      };
    },
    [setMeditationExperience],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleNextStep)(event_);
    },
    [handleSubmit, handleNextStep],
  );

  useEffect(() => {
    onCategoryChange(meditationExperience);
  }, [meditationExperience, onCategoryChange]);

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
              isChecked={meditationExperience === category}
            />
          );
        })}
      </div>

      <Button
        type="submit"
        label="Continue"
        style="secondary"
        isDisabled={!isValid}
      />

      <Button label="Back" style="outlined" onClick={handlePreviousStep} />
    </form>
  );
};

export { MeditationExperienceStep };
