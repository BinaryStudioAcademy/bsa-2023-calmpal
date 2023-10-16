import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BackButton, Header, View } from '~/libs/components/components';
import { MeditationScreenName } from '~/libs/enums/enums';
import { type MeditationNavigationParameterList } from '~/libs/types/types';
import { Meditation as MeditationPlayer } from '~/screens/meditation/meditation';
import { MeditationHome } from '~/screens/meditation-home/meditation-home';
import { MeditationList } from '~/screens/meditation-list/meditation-list';

import { styles } from './styles';

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
      <NativeStack.Screen
        name={MeditationScreenName.MEDITATION}
        component={MeditationPlayer}
        options={{
          headerTransparent: true,
          title: '',
          headerLeft: (): React.ReactNode => {
            return (
              <View style={styles.arrow}>
                <BackButton />
              </View>
            );
          },
        }}
      />
    </NativeStack.Navigator>
  );
};

export { Meditation };
