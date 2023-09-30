import React from 'react';

import { Button, Input, ScrollView } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useAppForm, useCallback, useFormController } from '#libs/hooks/hooks';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
} from '#packages/survey/survey';
import {
  DEFAULT_SURVEY_PAYLOAD,
  PREFERENCES_CATEGORIES,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants/constants';

import { SurveyCategory } from '../components';
import { styles } from './styles';

type Properties = {
  onSubmit: (options: string[]) => void;
};

const PreferencesStep: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, isValid, handleSubmit } = useAppForm<SurveyInputDto>(
    {
      defaultValues: DEFAULT_SURVEY_PAYLOAD,
      validationSchema: surveyInputValidationSchema,
    },
  );
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'preferences',
    control,
  });
  const hasOther = categoriesValue.includes('Other');

  const handleFieldChange = useCallback(
    (option: string) => {
      if (categoriesValue.includes(option)) {
        onCategoryChange(
          categoriesValue.filter((category) => {
            return category !== option;
          }),
        );

        return;
      }

      onCategoryChange([...categoriesValue, option]);
    },

    [categoriesValue, onCategoryChange],
  );

  const handleSurveySubmit = useCallback(
    (payload: SurveyInputDto) => {
      onSubmit(getSurveyCategories(payload));
    },
    [onSubmit],
  );

  const handleFormSubmit = useCallback((): void => {
    void handleSubmit(handleSurveySubmit)();
  }, [handleSubmit, handleSurveySubmit]);

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      {PREFERENCES_CATEGORIES.map((category: string) => {
        return (
          <SurveyCategory
            key={category}
            onChange={handleFieldChange}
            label={category}
          />
        );
      })}

      {hasOther && (
        <Input
          control={control}
          errors={errors}
          name="other"
          placeholder="Enter your preferences"
          rowsCount={TEXTAREA_ROWS_COUNT}
        />
      )}
      <Button
        label="Continue"
        onPress={handleFormSubmit}
        isDisabled={!isValid}
        type="outlined"
        color={AppColor.WHITE}
      />
    </ScrollView>
  );
};

export { PreferencesStep };
