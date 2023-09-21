import { Button, Checkbox, Input } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  // getSurveyCategories,
  SurveyValidationRule,
  worriesStepInputValidationSchema,
} from '#packages/survey/survey.js';
import {
  TEXTAREA_ROWS_COUNT,
  WORRIES_CATEGORIES,
  WORRIES_QUESTION,
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
  worries: string[];
  other: string;
};

const WorriesStep: React.FC<Properties> = ({
  // onSubmit,
  isNextStepDisabled,
  setIsNextStepDisabled,
  handleNextStep,
  handlePreviousStep,
}) => {
  const { control, errors, isValid, handleSubmit } = useAppForm<SurveyInputDto>(
    {
      defaultValues: { worries: [], other: '' },
      validationSchema: worriesStepInputValidationSchema,
    },
  );
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'worries',
    control,
  });

  const hasOther = categoriesValue.includes('Other');

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        if (categoriesValue.includes(category)) {
          onCategoryChange(
            categoriesValue.filter((option) => {
              return option !== category;
            }),
          );

          return;
        }

        onCategoryChange([...categoriesValue, category]);
      };
    },
    [categoriesValue, onCategoryChange],
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
    // [handleSubmit, handlePreferencesSubmit],
    [handleSubmit, handleNextStep],
  );

  useEffect(() => {
    setIsNextStepDisabled(!isValid);
  }, [isValid, setIsNextStepDisabled]);

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>{WORRIES_QUESTION}</div>

      <div className={styles['select']}>
        {WORRIES_CATEGORIES.map((category) => {
          return (
            <Checkbox
              key={category}
              label={category}
              onChange={handleFieldChange(category)}
            />
          );
        })}
        {hasOther && (
          <Input
            control={control}
            errors={errors}
            name="other"
            placeholder="Text"
            maxLength={SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH}
            rowsCount={TEXTAREA_ROWS_COUNT}
          />
        )}
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

export { WorriesStep };
