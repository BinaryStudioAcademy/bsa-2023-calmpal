import { type NavigationProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { Button, Input, ScrollView, Text } from '#libs/components/components';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useFormController,
} from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
} from '#packages/survey/survey';
import { type UserAuthResponseDto } from '#packages/users/users';
import {
  DEFAULT_SURVEY_PAYLOAD,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants/constants';
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
};

const SurveyStep: React.FC<SurveyStepProperties> = ({
  stepSurvey,
  navigation,
  stepTitle,
  categories,
  nextScreen,
  previousScreen,
  isButtonBack = true,
  isLastStep = false,
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

  const dispatch = useAppDispatch();
  const hasOther = categoriesValue.includes('Other');
  const surveyData = useAppSelector((state) => {
    return state.survey;
  });

  const { userId } = useAppSelector(({ auth }) => {
    return {
      userId: (auth.authenticatedUser as UserAuthResponseDto).id,
    };
  });

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

  const handleStepSubmit = useCallback(
    (payload: SurveyInputDto) => {
      const data = { [stepSurvey]: getSurveyCategories(payload) };
      dispatch(actions.updateSurveyData(data));
    },
    [dispatch, stepSurvey],
  );

  const [shouldRender, setShouldRender] = useState(false);

  const handleSurveySubmit = useCallback(
    (payload: SurveyInputDto) => {
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
