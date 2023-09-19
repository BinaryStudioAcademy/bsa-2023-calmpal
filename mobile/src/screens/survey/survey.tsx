import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Loader, SignBackground } from '#libs/components/components';
import { DataStatus, SurveyScreenName } from '#libs/enums/enums';
import { useAppSelector } from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { type UserAuthResponseDto } from '#packages/users/users';

import { PreferencesStep } from './components/components';
import { FeelingsStep } from './components/feelings-step/feelings-step';
import { GoalsStep } from './components/goals-step/goals-step';
import { JournalingStep } from './components/journaling-step/journaling-step';
import { MeditationStep } from './components/meditation-step/meditation-step';
import { WorriesStep } from './components/worries-step/worries-step';

const SurveyStack = createNativeStackNavigator<SurveyNavigationParameterList>();

const Survey: React.FC = () => {
  const { surveyPreferencesDataStatus } = useAppSelector(({ auth }) => {
    return {
      userId: (auth.authenticatedUser as UserAuthResponseDto).id,
      surveyPreferencesDataStatus: auth.surveyPreferencesDataStatus,
    };
  });

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  if (surveyPreferencesDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <SignBackground>
      <SurveyStack.Navigator screenOptions={screenOptions}>
        <SurveyStack.Screen
          name={SurveyScreenName.PREFERENCES}
          component={PreferencesStep}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.FEELINGS}
          component={FeelingsStep}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.GOALS}
          component={GoalsStep}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.WORRIES}
          component={WorriesStep}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.MEDITATION_EXPERIENCE}
          component={MeditationStep}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.JOURNALING_EXPERIENCE}
          component={JournalingStep}
        />
      </SurveyStack.Navigator>
    </SignBackground>
  );
};

export { Survey };
