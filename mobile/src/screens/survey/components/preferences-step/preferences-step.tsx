import React from 'react';
import { type ControllerRenderProps } from 'react-hook-form';

import {
  Button,
  Input,
  ScrollView,
  SurveyCategory,
} from '#libs/components/components';
import { useAppForm, useCallback, useFormController } from '#libs/hooks/hooks';
import {
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
  const { watch, control, errors, isValid, handleSubmit } =
    useAppForm<SurveyInputDto>({
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

  const handleOnSubmit = useCallback(
    (payload: SurveyInputDto) => {
      let options = payload.options;
      options = [
        ...new Set(
          options.map((option) =>
            option === SurveyTextareaOptions.OTHER ? payload.textarea : option,
          ),
        ),
      ];

      onSubmit(options);
    },
    [onSubmit],
  );

  const handleFormSubmit = useCallback((): void => {
    void handleSubmit(handleOnSubmit)();
  }, [handleSubmit, handleOnSubmit]);

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      {options.map((option, index) => (
        <SurveyCategory
          key={index}
          field={
            optionsField as ControllerRenderProps<
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
        isSurvey
      />
    </ScrollView>
  );
};

export { PreferencesStep };
