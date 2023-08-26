import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as StoreProvider } from 'react-redux';

import { Loader } from '#libs/components/components';
import { DataStatus, RootScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppRoute,
  useAppSelector,
  useEffect,
} from '#libs/hooks/hooks';
import { store } from '#libs/packages/store/store';
import { type NavigationScreenProperties } from '#libs/types/types';
import { Root as RootNavigation } from '#navigations/navigations';
import { actions as authActions } from '#slices/auth/auth';
import { actions as userActions } from '#slices/users/users';

import { styles } from './styles';

const App: React.FC = () => {
  const route = useAppRoute<NavigationScreenProperties>();
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  const isRoot = route.name === RootScreenName.MAIN;

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

  return (
    <StoreProvider store={store.instance}>
      <GestureHandlerRootView style={styles.root}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

export { App };
