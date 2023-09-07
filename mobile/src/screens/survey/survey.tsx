import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  Link,
  Loader,
  SignBackground,
  Text,
} from '#libs/components/components';
import {
  DataStatus,
  RootScreenName,
  SurveyScreenName,
} from '#libs/enums/enums';
import { useAppSelector } from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { type UserAuthResponseDto } from '#packages/users/users';

import { PreferencesStep } from './components/components';
import { FeelingsStep } from './components/feelings-step/feelings-step';
import { GoalsStep } from './components/goal-step/goal-step';
import { JournalingStep } from './components/journaling-step/journaling-step';
import { MeditationStep } from './components/meditation-step/meditation-step';
import { WorriesStep } from './components/worries-step/worries-step';
import { styles } from './styles';

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
      <Text style={styles.labelText}>
        <Link label="Sign In" to={`/${RootScreenName.SIGN_IN}`} />
      </Text>
      <SurveyStack.Navigator screenOptions={screenOptions}>
        <SurveyStack.Screen
          name={SurveyScreenName.PREFERENCE}
          component={PreferencesStep}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.FEELING}
          component={FeelingsStep}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.GOAL}
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
