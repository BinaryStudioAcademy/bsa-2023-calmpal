import { Button, Input, SurveyCategory } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type FormControllerRenderProps } from '#libs/types/types.js';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
  SurveyTextareaOptions,
} from '#packages/survey/survey.js';
import {
  DEFAULT_SURVEY_PAYLOAD,
  PREFERENCES_CATEGORIES,
  TEXTAREA_MAX_LENGTH,
  TEXTAREA_ROWS_COUNT,
} from '#pages/surveys/libs/constants.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (options: string[]) => void;
};

const PreferencesStep: React.FC<Properties> = ({ onSubmit }) => {
  const {
    watch,
    control,
    errors,
    isValid,
    handleSubmit: handleValidationSubmit,
  } = useAppForm<SurveyInputDto>({
    defaultValues: DEFAULT_SURVEY_PAYLOAD,
    validationSchema: surveyInputValidationSchema,
  });
  const { field: optionsField } = useFormController({
    name: 'options',
    control,
  });

  const options: string[] = [
    ...PREFERENCES_CATEGORIES,
    SurveyTextareaOptions.OTHER,
  ];

  const activeOptions = watch('options');
  const hasOther = activeOptions.includes('Other');

  const handleSubmit = useCallback(
    (payload: SurveyInputDto) => {
      onSubmit(getSurveyCategories(payload));
    },
    [onSubmit],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleValidationSubmit(handleSubmit)(event_);
    },
    [handleValidationSubmit, handleSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>What can we help you with?</div>

      <div className={styles['select']}>
        {options.map((option) => (
          <SurveyCategory
            key={option}
            field={
              optionsField as FormControllerRenderProps<
                SurveyInputDto,
                'options' | 'textarea' | `options.${number}`
              >
            }
            label={option}
          />
        ))}
        {hasOther && (
          <Input
            control={control}
            errors={errors}
            name="textarea"
            placeholder="Text"
            maxLength={TEXTAREA_MAX_LENGTH}
            rowsCount={TEXTAREA_ROWS_COUNT}
          />
        )}
      </div>

      <Button
        type="submit"
        label="Continue"
        style="secondary"
        disabled={!isValid}
      />
    </form>
  );
};

export { PreferencesStep };
