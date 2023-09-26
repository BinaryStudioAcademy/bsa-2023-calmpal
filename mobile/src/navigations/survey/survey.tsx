import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { SignBackground } from '#libs/components/components';
import { useAppDispatch, useEffect } from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import { actions as authActions } from '#slices/auth/auth';

import { SURVEY_NAVIGATION_ITEMS } from './libs/constants';

const NativeStack = createNativeStackNavigator<SurveyNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  return (
    <SignBackground>
      <NativeStack.Navigator screenOptions={screenOptions}>
        {SURVEY_NAVIGATION_ITEMS.map((screen) => {
          return (
            <NativeStack.Screen
              name={screen.name}
              component={screen.component}
              key={screen.name}
            />
          );
        })}
      </NativeStack.Navigator>
    </SignBackground>
  );
};

export { Survey };
