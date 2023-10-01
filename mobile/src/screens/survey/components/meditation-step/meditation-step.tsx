import { type NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SurveyScreenName } from '#libs/enums/enums';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { MEDITATION_EXPERIENCE_CATEGORIES } from '#screens/survey/libs/constants/constants';

import { SurveyStepOne } from '../components';

const MeditationStep: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<SurveyNavigationParameterList>>();

  return (
    <SurveyStepOne
      stepSurvey={SurveyScreenName.MEDITATION_EXPERIENCE}
      navigation={navigation}
      stepTitle="What's your experince with meditation?"
      categories={MEDITATION_EXPERIENCE_CATEGORIES}
      nextScreen={SurveyScreenName.JOURNALING_EXPERIENCE}
      previousScreen={SurveyScreenName.WORRIES}
      isOneOption
    />
  );
};

export { MeditationStep };
