import { Button, Checkbox } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { journalingExperienceStepInputValidationSchema } from '#packages/survey/survey.js';
import {
  JOURNALING_EXPERIENCE_CATEGORIES,
  JOURNALING_EXPERIENCE_QUESTION,
} from '#pages/surveys/libs/constants.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (options: string[]) => void;
};

type SurveyInputDto = {
  journalingExperience: string[];
};

const getSurveyCategories: (payload: SurveyInputDto) => string[] = (
  payload,
) => {
  return [...new Set(payload.journalingExperience)];
};

const JournalingExperienceStep: React.FC<Properties> = ({ onSubmit }) => {
  const { control, isValid, handleSubmit } = useAppForm<SurveyInputDto>({
    defaultValues: { journalingExperience: [] },
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
        onCategoryChange([category]);
      };
    },
    [onCategoryChange],
  );

  const handlePreferencesSubmit = useCallback(
    (payload: SurveyInputDto) => {
      onSubmit(getSurveyCategories(payload));
    },
    [onSubmit],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handlePreferencesSubmit)(event_);
    },
    [handleSubmit, handlePreferencesSubmit],
  );

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
      <Button label="Back" style="outlined" />
    </form>
  );
};

export { JournalingExperienceStep };
