import { Button, Radio } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type JournalingExperienceInputDto } from '#packages/survey/libs/types/types.js';
import { oneAnswerStepInputValidationSchema } from '#packages/survey/survey.js';
import { JOURNALING_EXPERIENCE_CATEGORIES } from '#pages/surveys/libs/constants.js';
import { useSurvey } from '#pages/surveys/libs/hooks/survey.hooks.js';

import styles from '../styles.module.scss';

type Properties = {
  onSubmit: () => void;
  onPreviousStep: () => void;
};

const JournalingExperienceStep: React.FC<Properties> = ({
  onSubmit,
  onPreviousStep,
}) => {
  const { journalingExperience, setJournalingExperience } = useSurvey();

  const { control, isValid, handleSubmit } =
    useAppForm<JournalingExperienceInputDto>({
      defaultValues: { journalingExperience: journalingExperience },
      validationSchema: oneAnswerStepInputValidationSchema,
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
      <div className={styles['title']}>
        What is your experience with journaling?
      </div>
      <div className={styles['select']}>
        {JOURNALING_EXPERIENCE_CATEGORIES.map((category) => {
          return (
            <Radio
              control={control}
              name="journalingExperience"
              key={category}
              label={category}
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
      <Button label="Back" style="outlined" onClick={onPreviousStep} />
    </form>
  );
};

export { JournalingExperienceStep };
