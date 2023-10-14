import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { Loader } from '~/libs/components/components';
import { DataStatus } from '~/libs/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
} from '~/libs/hooks/hooks';
import { type RootNavigationParameterList } from '~/libs/types/types';
import { actions as authActions } from '~/slices/auth/auth';

import { NAVIGATION_ITEMS } from './libs/constants/constants';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    authenticatedUser,
    authenticatedUserDataStatus,
    surveyPreferencesDataStatus,
    currentChatMessagesDataStatus,
  } = useAppSelector(({ auth, chats }) => {
    return {
      authenticatedUser: auth.authenticatedUser,
      authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
      surveyPreferencesDataStatus: auth.surveyPreferencesDataStatus,
      currentChatMessagesDataStatus: chats.currentChatMessagesDataStatus,
    };
  });

  const isLoaderVisible =
    authenticatedUserDataStatus === DataStatus.IDLE ||
    authenticatedUserDataStatus === DataStatus.PENDING ||
    surveyPreferencesDataStatus === DataStatus.PENDING ||
    currentChatMessagesDataStatus === DataStatus.PENDING;

  const filteredNavigationItems = useMemo(() => {
    return NAVIGATION_ITEMS.filter((screen) => {
      return screen.checkShouldBeRendered(
        Boolean(authenticatedUser),
        Boolean(authenticatedUser?.isSurveyCompleted),
      );
    });
  }, [authenticatedUser]);

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  return (
    <>
      <NativeStack.Navigator screenOptions={screenOptions}>
        {filteredNavigationItems.map((screen) => {
          return (
            <NativeStack.Screen
              name={screen.name}
              component={screen.component}
              key={screen.name}
            />
          );
        })}
      </NativeStack.Navigator>
      {isLoaderVisible && <Loader />}
    </>
  );
};

export { Root };
