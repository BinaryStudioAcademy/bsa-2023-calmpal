import { type NavigationProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { surveyInputValidationSchemaOne } from 'shared/build/index.js';

import { Button, ScrollView, Text } from '#libs/components/components';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useFormController,
} from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { type SurveyOneInputDto } from '#packages/survey/survey';
import { type UserAuthResponseDto } from '#packages/users/users';
import { DEFAULT_SURVEY_ONE_PAYLOAD } from '#screens/survey/libs/constants/constants';
import { actions as authActions } from '#slices/auth/auth';
import { actions } from '#slices/survey/survey';

import { SurveyCategory } from '../components';
import { styles } from './styles';

type SurveyStepProperties = {
  stepSurvey: string;
  navigation: NavigationProp<SurveyNavigationParameterList>;
  stepTitle: string;
  categories: string[];
  nextScreen: keyof SurveyNavigationParameterList;
  previousScreen: keyof SurveyNavigationParameterList;
  isButtonBack?: boolean;
  isLastStep?: boolean;
  isOneOption?: boolean;
};

const SurveyStepOne: React.FC<SurveyStepProperties> = ({
  stepSurvey,
  navigation,
  stepTitle,
  categories,
  nextScreen,
  previousScreen,
  isButtonBack = true,
  isLastStep = false,
  isOneOption = false,
}) => {
  const { control, isValid, handleSubmit } = useAppForm<SurveyOneInputDto>({
    defaultValues: DEFAULT_SURVEY_ONE_PAYLOAD,
    validationSchema: surveyInputValidationSchemaOne,
  });

  const {
    field: { onChange: onCategoryChange },
  } = useFormController({
    name: 'preferences',
    control,
  });

  const dispatch = useAppDispatch();
  const surveyData = useAppSelector((state) => {
    return state.survey;
  });

  const { userId } = useAppSelector(({ auth }) => {
    return {
      userId: (auth.authenticatedUser as UserAuthResponseDto).id,
    };
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelection = (category: string): void => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleStepSubmit = useCallback(
    (payload: SurveyOneInputDto) => {
      const data = { [stepSurvey]: payload.preferences };
      dispatch(actions.updateSurveyData(data));
    },
    [dispatch, stepSurvey],
  );

  const [shouldRender, setShouldRender] = useState(false);

  const handleSurveySubmit = useCallback(
    (payload: SurveyOneInputDto) => {
      handleStepSubmit(payload);
      const user = { userId: userId };
      dispatch(actions.updateSurveyData(user));
      setShouldRender(true);
    },
    [dispatch, handleStepSubmit, userId],
  );

  useEffect(() => {
    if (shouldRender && isLastStep) {
      void dispatch(authActions.createUserSurvey(surveyData));
    }
  }, [shouldRender, isLastStep, surveyData, dispatch]);

  const handleFormSubmit = useCallback(() => {
    void handleSubmit(isLastStep ? handleSurveySubmit : handleStepSubmit)();
  }, [handleSubmit, handleStepSubmit, handleSurveySubmit, isLastStep]);

  const handleBack = (): void => {
    navigation.navigate(previousScreen);
  };

  const handleContinue = (): void => {
    handleFormSubmit();
    if (!isLastStep) {
      navigation.navigate(nextScreen);
    }
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
            onChange={handleCategorySelection}
            label={category}
            isSelectedOne={selectedCategory === category}
            isOneOption={isOneOption}
          />
        );
      })}
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

export { SurveyStepOne };
