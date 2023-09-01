import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { Loader } from '#libs/components/components';
import { DataStatus, RootScreenName } from '#libs/enums/enums';
import { useAppDispatch, useAppSelector, useEffect } from '#libs/hooks/hooks';
import { type RootNavigationParameterList } from '#libs/types/types';
import { Auth } from '#screens/auth/auth';
import { ProfileSettings } from '#screens/profile-settings/profile-settings';
import { Survey } from '#screens/survey/survey';
import { actions as authActions } from '#slices/auth/auth';

import { Main } from '../main/main';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSurveyCompleted, authenticatedUser, authenticatedUserDataStatus } =
    useAppSelector(({ auth }) => ({
      isSurveyCompleted: auth.authenticatedUser?.isSurveyCompleted,
      authenticatedUser: auth.authenticatedUser,
      authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
    }));

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  if (
    authenticatedUserDataStatus === DataStatus.IDLE ||
    authenticatedUserDataStatus === DataStatus.PENDING
  ) {
    return <Loader />;
  }

  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      {authenticatedUser ? (
        isSurveyCompleted ? (
          <NativeStack.Screen name={RootScreenName.MAIN} component={Main} />
        ) : (
          <NativeStack.Screen name={RootScreenName.SURVEY} component={Survey} />
        )
      ) : (
        <>
          <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
          <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
        </>
      )}
      <NativeStack.Screen
        name={RootScreenName.SETTINGS}
        component={ProfileSettings}
      />
    </NativeStack.Navigator>
  );
};

export { Root };
