import 'fast-text-encoding';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Provider as StoreProvider } from 'react-redux';

import { Toast } from '#libs/components/components';
import { useEffect } from '#libs/hooks/hooks';
import { store } from '#libs/packages/store/store';
import { Root as RootNavigation } from '#navigations/navigations';

import { SPLASH_SCREEN_HIDE_TIMEOUT } from './libs/constants/constants';
import { styles } from './styles';

// Prevent white background color on nested navigation stack
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App: React.FC = () => {
  useEffect(() => {
    // To prevent white screen after splash screen disappears
    const splashScreenTimer = setTimeout(() => {
      SplashScreen.hide();
    }, SPLASH_SCREEN_HIDE_TIMEOUT);

    return () => {
      clearTimeout(splashScreenTimer);
    };
  }, []);

  return (
    <StoreProvider store={store.instance}>
      <GestureHandlerRootView style={styles.root}>
        <NavigationContainer theme={theme}>
          <RootNavigation />
        </NavigationContainer>
        <Toast />
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

export { App };
