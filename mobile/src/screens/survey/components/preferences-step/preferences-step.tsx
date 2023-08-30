import React from 'react';

import {
  Button,
  Input,
  ScrollView,
  SurveyCategory,
} from '#libs/components/components';
import { useAppForm, useCallback, useFormController } from '#libs/hooks/hooks';
import { type FormControllerRenderProps } from '#libs/types/types';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
  SurveyTextareaOptions,
} from '#packages/survey/survey';
import {
  DEFAULT_SURVEY_PAYLOAD,
  PREFERENCES_CATEGORIES,
  TEXTAREA_MAX_LENGTH,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants';

import { styles } from './styles';

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

  const handleFormSubmit = useCallback((): void => {
    void handleValidationSubmit(handleSubmit)();
  }, [handleValidationSubmit, handleSubmit]);

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
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
