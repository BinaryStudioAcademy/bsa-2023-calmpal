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
import { actions as authActions } from '#slices/auth/auth';
import { actions as userActions } from '#slices/users/users';

import { Main } from '../main/main';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

type RootProperties = {
  routeName: string | undefined;
};

const Root: React.FC<RootProperties> = ({ routeName }) => {
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  const isRoot = routeName === RootScreenName.SIGN_IN;

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll()).catch((error: Error) => {
        throw new Error(`Error loading all users: ${error.message}`);
      });
    }
  }, [isRoot, dispatch]);

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser()).catch((error: Error) => {
      throw new Error(`Error getting authenticated user: ${error.message}`);
    });
  }, [dispatch]);

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  if (authenticatedUserDataStatus === DataStatus.FULFILLED) {
    return <Main />;
  }

  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
      <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
      <NativeStack.Screen name={RootScreenName.MAIN} component={Main} />
    </NativeStack.Navigator>
  );
};

export { Root };
