import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from '#libs/components/components';
import { MeditationScreenName } from '#libs/enums/enums';
import { type MeditationNavigationParameterList } from '#libs/types/types';
import { MeditationList } from '#screens/meditation-list/meditation-list';
import { MeditationTopics } from '#screens/meditation-topics/meditation-topics';

const NativeStack =
  createNativeStackNavigator<MeditationNavigationParameterList>();

const Meditation: React.FC = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name={MeditationScreenName.MEDITATION_TOPICS}
        component={MeditationTopics}
        options={{
          header: () => <Header title={'Meditation \n& Breathing'} />,
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
