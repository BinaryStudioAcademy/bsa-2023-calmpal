import { type NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SurveyScreenName } from '#libs/enums/enums';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { PREFERENCES_CATEGORIES } from '#screens/survey/libs/constants/constants';

import { SurveyStepMultiple } from '../components';

const PreferencesStep: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<SurveyNavigationParameterList>>();

  return (
    <SurveyStepMultiple
      stepSurvey={SurveyScreenName.PREFERENCES}
      navigation={navigation}
      stepTitle="What can we help you with?"
      categories={PREFERENCES_CATEGORIES}
      nextScreen={SurveyScreenName.FEELINGS}
      previousScreen={SurveyScreenName.PREFERENCES}
      isButtonBack={false}
    />
  );
};

export { PreferencesStep };
