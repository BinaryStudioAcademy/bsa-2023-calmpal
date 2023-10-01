import { type NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SurveyScreenName } from '#libs/enums/enums';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { FEELING_CATEGORIES } from '#screens/survey/libs/constants/constants';

import { SurveyStepMultiple } from '../components';

const FeelingsStep: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<SurveyNavigationParameterList>>();

  return (
    <SurveyStepMultiple
      stepSurvey={SurveyScreenName.FEELINGS}
      navigation={navigation}
      stepTitle="How have you been feeling lately?"
      categories={FEELING_CATEGORIES}
      nextScreen={SurveyScreenName.GOALS}
      previousScreen={SurveyScreenName.PREFERENCES}
    />
  );
};

export { FeelingsStep };
