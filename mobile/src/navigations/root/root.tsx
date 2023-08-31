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
import { Survey } from '#screens/survey/survey';
import { actions as authActions } from '#slices/auth/auth';

import { Main } from '../main/main';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSurveyCompleted } = useAppSelector(({ auth }) => ({
    isSurveyCompleted: auth.authenticatedUser?.isSurveyCompleted,
  }));
  const { authenticatedUser, authenticatedUserDataStatus } = useAppSelector(
    ({ auth }) => ({
      authenticatedUser: auth.authenticatedUser,
      authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
    }),
  );

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
    </NativeStack.Navigator>
  );
};

export { Root };
