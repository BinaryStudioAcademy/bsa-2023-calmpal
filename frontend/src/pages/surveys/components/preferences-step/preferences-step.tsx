import { Button, Input } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
} from '#packages/survey/survey.js';
import {
  DEFAULT_SURVEY_PAYLOAD,
  INVALID_ARRAY_INDEX,
  PREFERENCES_CATEGORIES,
  SPLICE_COUNT,
  TEXTAREA_MAX_LENGTH,
  TEXTAREA_ROWS_COUNT,
} from '#pages/surveys/libs/constants.js';

import { SurveyCategory } from '../survey-category/survey-category.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (options: string[]) => void;
};

const PreferencesStep: React.FC<Properties> = ({ onSubmit }) => {
  const {
    control,
    errors,
    isValid,
    handleSubmit: handleValidationSubmit,
  } = useAppForm<SurveyInputDto>({
    defaultValues: DEFAULT_SURVEY_PAYLOAD,
    validationSchema: surveyInputValidationSchema,
  });
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'preferences',
    control,
  });

  const hasOther = categoriesValue.includes('Other');

  const handleFieldChange = useCallback(
    (option: string) => {
      const index = categoriesValue.indexOf(option);

      if (index === INVALID_ARRAY_INDEX) {
        onCategoryChange([...categoriesValue, option]);

        return;
      }

      categoriesValue.splice(index, SPLICE_COUNT);
      onCategoryChange(categoriesValue);
    },
    [categoriesValue, onCategoryChange],
  );

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
        {PREFERENCES_CATEGORIES.map((category) => (
          <SurveyCategory
            key={category}
            onChange={handleFieldChange}
            label={category}
          />
        ))}
        {hasOther && (
          <Input
            control={control}
            errors={errors}
            name="other"
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
