import React from 'react';

import { Button, Input, ScrollView } from '#libs/components/components';
import { useAppForm, useCallback, useFormController } from '#libs/hooks/hooks';
// import { type FormControllerRenderProps } from '#libs/types/types';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
  // SurveyTextareaOptions,
} from '#packages/survey/survey';
import {
  DEFAULT_SURVEY_PAYLOAD,
  INVALID_ARRAY_INDEX,
  PREFERENCES_CATEGORIES,
  SPLICE_COUNT,
  TEXTAREA_MAX_LENGTH,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants';

import { SurveyCategory } from '../components';
import { styles } from './styles';

type Properties = {
  onSubmit: (options: string[]) => void;
};

const PreferencesStep: React.FC<Properties> = ({ onSubmit }) => {
  const {
    // watch,
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

  // const options: string[] = [
  //   ...PREFERENCES_CATEGORIES,
  //   SurveyTextareaOptions.OTHER,
  // ];

  // const activeOptions = watch('options');
  // const hasOther = activeOptions.includes('Other');
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

  const handleFormSubmit = useCallback((): void => {
    void handleValidationSubmit(handleSubmit)();
  }, [handleValidationSubmit, handleSubmit]);

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* {options.map((option) => (
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
      ))} */}

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
          placeholder="Enter your preferences"
          maxLength={TEXTAREA_MAX_LENGTH}
          rowsCount={TEXTAREA_ROWS_COUNT}
        />
      )}
      <Button
        label="Continue"
        onPress={handleFormSubmit}
        isDisabled={!isValid}
        style="outlined"
      />
    </ScrollView>
  );
};

export { PreferencesStep };
