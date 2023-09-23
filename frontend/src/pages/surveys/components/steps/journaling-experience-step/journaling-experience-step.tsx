import { Button, Checkbox } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type JournalingExperienceInputDto } from '#packages/survey/libs/types/types.js';
import { journalingExperienceStepInputValidationSchema } from '#packages/survey/survey.js';
import {
  JOURNALING_EXPERIENCE_CATEGORIES,
  JOURNALING_EXPERIENCE_QUESTION,
} from '#pages/surveys/libs/constants.js';
import { useSurvey } from '#pages/surveys/libs/hooks/survey.hooks.js';

import styles from '../styles.module.scss';

type Properties = {
  onSubmit: () => void;
  handlePreviousStep: () => void;
};

const JournalingExperienceStep: React.FC<Properties> = ({
  onSubmit,
  handlePreviousStep,
}) => {
  const { journalingExperience, setJournalingExperience } = useSurvey();

  const { control, isValid, handleSubmit } =
    useAppForm<JournalingExperienceInputDto>({
      defaultValues: { journalingExperience: journalingExperience },
      validationSchema: journalingExperienceStepInputValidationSchema,
    });
  const {
    field: { onChange: onCategoryChange },
  } = useFormController({
    name: 'journalingExperience',
    control,
  });

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        setJournalingExperience(category);
      };
    },
    [setJournalingExperience],
  );

  const handlePreferencesSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handlePreferencesSubmit)(event_);
    },
    [handleSubmit, handlePreferencesSubmit],
  );

  useEffect(() => {
    onCategoryChange(journalingExperience);
  }, [journalingExperience, onCategoryChange]);

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>{JOURNALING_EXPERIENCE_QUESTION}</div>
      <div className={styles['select']}>
        {JOURNALING_EXPERIENCE_CATEGORIES.map((category) => {
          return (
            <Checkbox
              key={category}
              label={category}
              type="radio"
              onChange={handleFieldChange(category)}
              isChecked={journalingExperience === category}
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

export { JournalingExperienceStep };
