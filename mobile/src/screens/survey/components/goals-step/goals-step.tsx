import { type NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SurveyScreenName } from '#libs/enums/enums';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { GOALS_CATEGORIES } from '#screens/survey/libs/constants/constants';

import { SurveyStepMultiple } from '../components';

const GoalsStep: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<SurveyNavigationParameterList>>();

  return (
    <SurveyStepMultiple
      stepSurvey={SurveyScreenName.GOALS}
      navigation={navigation}
      stepTitle="What do you want to achieve with Calmpal?"
      categories={GOALS_CATEGORIES}
      nextScreen={SurveyScreenName.WORRIES}
      previousScreen={SurveyScreenName.FEELINGS}
    />
  );
};

export { GoalsStep };
