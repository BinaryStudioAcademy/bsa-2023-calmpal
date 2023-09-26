import { type NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SurveyScreenName } from '#libs/enums/enums';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { JOURNALING_EXPERIENCE_CATEGORIES } from '#screens/survey/libs/constants';

import { SurveyStep } from '../components';

const JournalingStep: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<SurveyNavigationParameterList>>();

  return (
    <SurveyStep
      navigation={navigation}
      stepTitle="What's your experience with journaling?"
      categories={JOURNALING_EXPERIENCE_CATEGORIES}
      nextScreen={SurveyScreenName.MEDITATION_EXPERIENCE}
      previousScreen={SurveyScreenName.PREFERENCES}
    />
  );
};

export { JournalingStep };
