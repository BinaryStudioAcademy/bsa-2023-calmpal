import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from '#libs/components/components';
import { MeditationScreenName } from '#libs/enums/enums';
import { type MeditationNavigationParameterList } from '#libs/types/types';
import { MeditationHome } from '#screens/meditation-home/meditation-home';
import { MeditationList } from '#screens/meditation-list/meditation-list';

const NativeStack =
  createNativeStackNavigator<MeditationNavigationParameterList>();

const Meditation: React.FC = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name={MeditationScreenName.MEDITATION_MENU}
        component={MeditationHome}
        options={{
          header: (): React.ReactNode => {
            return (
              <Header title={'Meditation \n& Breathing'} isProfileVisible />
            );
          },
        }}
      />
      <NativeStack.Screen
        name={MeditationScreenName.MEDITATION_LIST}
        component={MeditationList}
      />
    </NativeStack.Navigator>
  );
};

export { Meditation };
