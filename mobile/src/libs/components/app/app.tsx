import 'fast-text-encoding';

import {
  NavigationContainer,
  type NavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Provider as StoreProvider } from 'react-redux';

import { useEffect, useRef, useState } from '#libs/hooks/hooks';
import { store } from '#libs/packages/store/store';
import { Root as RootNavigation } from '#navigations/navigations';

import { styles } from './styles';

type NavigationParameters = {
  getCurrentRoute: () => { name: string } | undefined;
};

const App: React.FC = () => {
  const navigationReference =
    useRef<NavigationContainerRef<NavigationParameters>>(null);

  const [routeName, setRouteName] = useState<string | undefined>();

  useEffect(() => {
    if (navigationReference.current) {
      setRouteName(navigationReference.current.getCurrentRoute()?.name);
    }
  }, []);

  const handleStateChange = (): void => {
    if (navigationReference.current) {
      const currentRouteName =
        navigationReference.current.getCurrentRoute()?.name;
      setRouteName(currentRouteName);
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StoreProvider store={store.instance}>
      <GestureHandlerRootView style={styles.root}>
        <NavigationContainer
          ref={navigationReference}
          onReady={(): void => {
            if (navigationReference.current) {
              setRouteName(navigationReference.current.getCurrentRoute()?.name);
            }
          }}
          onStateChange={handleStateChange}
        >
          <RootNavigation routeName={routeName} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

export { App };
