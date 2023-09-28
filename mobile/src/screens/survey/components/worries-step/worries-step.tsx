import { type NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SurveyScreenName } from '#libs/enums/enums';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { WORRIES_CATEGORIES } from '#screens/survey/libs/constants/constants';

import { SurveyStep } from '../components';

const WorriesStep: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<SurveyNavigationParameterList>>();

  return (
    <SurveyStep
      stepSurvey={SurveyScreenName.WORRIES}
      navigation={navigation}
      stepTitle="What do you usually worry about most?"
      categories={WORRIES_CATEGORIES}
      nextScreen={SurveyScreenName.MEDITATION_EXPERIENCE}
      previousScreen={SurveyScreenName.GOALS}
    />
  );
};

export { WorriesStep };
