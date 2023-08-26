import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '#libs/packages/store/store';
import { Root as RootNavigation } from '#navigations/navigations';

import { styles } from './styles';

const App: React.FC = () => {
  SplashScreen.hide();

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
