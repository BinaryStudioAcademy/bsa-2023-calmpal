import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

// import { Loader } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
// import { DataStatus, RootScreenName } from '#libs/enums/enums';
// import { useAppDispatch } from '#libs/hooks/hooks';
// import { useAppDispatch, useAppSelector, useEffect } from '#libs/hooks/hooks';
import { type RootNavigationParameterList } from '#libs/types/types';
import { Auth } from '#screens/auth/auth';
import { Survey } from '#screens/survey/survey';

// import { actions as authActions } from '#slices/auth/auth';
// import { actions as userActions } from '#slices/users/users';
import { Main } from '../main/main';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const { surveyPreferencesDataStatus } = useAppSelector(({ auth }) => ({
  //   surveyPreferencesDataStatus: auth.surveyPreferencesDataStatus,
  // }));

  // const isRoot = routeName === RootScreenName.SIGN_IN;

  // if (surveyPreferencesDataStatus === DataStatus.PENDING) {
  //   return <Loader />;
  // }

  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
      <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
      <NativeStack.Screen name={RootScreenName.MAIN} component={Main} />
      <NativeStack.Screen name={RootScreenName.SURVEY} component={Survey} />
    </NativeStack.Navigator>
  );
};

export { Root };
