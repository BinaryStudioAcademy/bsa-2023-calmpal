import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { ProtectedRoute } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
import { type RootNavigationParameterList } from '#libs/types/types';
import { Auth } from '#screens/auth/auth';

import { Main } from '../main/main';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: React.FC = () => {
  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
      <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
      <NativeStack.Screen
        name={RootScreenName.MAIN}
        component={(): JSX.Element => (
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        )}
      />
    </NativeStack.Navigator>
  );
};

export { Root };
