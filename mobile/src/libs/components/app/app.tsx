import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { Provider as StoreProvider } from 'react-redux';

import { Toast } from '#libs/components/components';
import { useEffect } from '#libs/hooks/hooks';
import { store } from '#libs/packages/store/store';
import { Root as RootNavigation } from '#navigations/navigations';

import { styles } from './styles';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
    const startPlayer = async (): Promise<void> => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    };

    void startPlayer();
  }, []);

  return (
    <StoreProvider store={store.instance}>
      <GestureHandlerRootView style={styles.root}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
        <Toast />
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

export { App };
