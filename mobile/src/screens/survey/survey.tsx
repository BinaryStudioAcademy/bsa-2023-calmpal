import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SignBackground } from '#libs/components/components';
import { SurveyScreenName } from '#libs/enums/enums';
import { useAppDispatch, useAppSelector, useState } from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { type UserAuthResponseDto } from '#packages/users/users';
import { actions as authActions } from '#slices/auth/auth';

import { PreferencesStep } from './components/components';
import { FeelingsStep } from './components/feelings-step/feelings-step';
import { GoalsStep } from './components/goals-step/goals-step';
import { JournalingStep } from './components/journaling-step/journaling-step';
import { MeditationStep } from './components/meditation-step/meditation-step';
import { WorriesStep } from './components/worries-step/worries-step';

const SurveyStack = createNativeStackNavigator<SurveyNavigationParameterList>();

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();
  const [preferencesSurvey, setPreferencesSurvey] = useState([]);
  const [feelingsSurvey, setFeelingsSurvey] = useState([]);
  const [goalsSurvey, setGoalsSurvey] = useState([]);
  const [worriesSurvey, setWorriesSurvey] = useState([]);
  const [meditationSurvey, setMeditationSurvey] = useState([]);
  const { userId } = useAppSelector(({ auth }) => {
    return {
      userId: (auth.authenticatedUser as UserAuthResponseDto).id,
    };
  });

  const handleSubmit = (option: string[]): void => {
    void dispatch(
      authActions.createUserSurvey({
        userId: userId,
        preferences: preferencesSurvey,
        feelings: feelingsSurvey,
        goals: goalsSurvey,
        worries: worriesSurvey,
        meditation_experience: meditationSurvey,
        journaling_experience: option,
      }),
    );
  };

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <SignBackground>
      <SurveyStack.Navigator screenOptions={screenOptions}>
        <SurveyStack.Screen
          name={SurveyScreenName.PREFERENCES}
          component={PreferencesStep}
          initialParams={{ setPreferencesSurvey }}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.FEELINGS}
          component={FeelingsStep}
          initialParams={{ setFeelingsSurvey }}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.GOALS}
          component={GoalsStep}
          initialParams={{ setGoalsSurvey }}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.WORRIES}
          component={WorriesStep}
          initialParams={{ setWorriesSurvey }}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.MEDITATION_EXPERIENCE}
          component={MeditationStep}
          initialParams={{ setMeditationSurvey }}
        />
        <SurveyStack.Screen
          name={SurveyScreenName.JOURNALING_EXPERIENCE}
          component={JournalingStep}
          initialParams={{
            handleSubmitSurvey: handleSubmit,
          }}
        />
      </SurveyStack.Navigator>
    </SignBackground>
  );
};
export { Survey };
