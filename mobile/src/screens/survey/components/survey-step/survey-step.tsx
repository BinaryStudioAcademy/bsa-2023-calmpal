import { type NavigationProp } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Button, Input, ScrollView, Text } from '#libs/components/components';
import { useAppForm, useFormController } from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
} from '#packages/survey/survey';
import {
  DEFAULT_SURVEY_PAYLOAD,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants';

import { SurveyCategory } from '../components';
import { styles } from './styles';

type SurveyStepProperties = {
  navigation: NavigationProp<SurveyNavigationParameterList>;
  stepTitle: string;
  categories: string[];
  nextScreen: keyof SurveyNavigationParameterList;
  previousScreen: keyof SurveyNavigationParameterList;
  isButtonBack?: boolean;
};

const SurveyStep: React.FC<SurveyStepProperties> = ({
  navigation,
  stepTitle,
  categories,
  nextScreen,
  previousScreen,
  isButtonBack = true,
}) => {
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

  const handleSurveySubmit = useCallback((payload: SurveyInputDto) => {
    getSurveyCategories(payload);
    // console.log(getSurveyCategories(payload));
  }, []);

  const handleFormSubmit = useCallback(() => {
    void handleSubmit(handleSurveySubmit)();
  }, [handleSubmit, handleSurveySubmit]);

  const handleBack = (): void => {
    navigation.navigate(previousScreen);
  };

  const handleContinue = (): void => {
    navigation.navigate(nextScreen);
    handleFormSubmit();
  };

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titleText}>{stepTitle}</Text>
      {categories.map((category) => {
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
        onPress={handleContinue}
        isDisabled={!isValid}
        type="outlined"
      />
      {isButtonBack && (
        <Button label="Go back" onPress={handleBack} type="solid" />
      )}
    </ScrollView>
  );
};

export { SurveyStep };
