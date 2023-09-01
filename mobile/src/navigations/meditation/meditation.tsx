import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MeditationScreenName } from '#libs/enums/enums';
import { type MedationNavigationParameterList } from '#libs/types/navigation/meditation-navigation-parameter-list.type';
import { MeditationList } from '#screens/meditation-list/meditation-list';
import { MeditationTopics } from '#screens/meditation-topics/meditation-topics';

// import { styles } from './styles';

const NativeStack =
  createNativeStackNavigator<MedationNavigationParameterList>();

// const screenOptions: NativeStackNavigationOptions = {
//   headerShown: false,
// };
// const tabNavigatorOptions = {
//     headerStyle: styles.header,
//     headerTitleStyle: styles.headerTitle,
//     tabBarActiveTintColor: AppColor.BLUE_300,
//     tabBarInactiveTintColor: AppColor.GRAY_400,
//     tabBarShowLabel: false,
//     tabBarStyle: styles.tabBar,
//   };

const screenOptions: NativeStackNavigationOptions = {
  //   headerStyle: styles.header,
  //   headerTitleStyle: styles.headerTitle,
};

const Meditation: React.FC = () => {
  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen
        name={MeditationScreenName.MEDITATION_TOPICS}
        component={MeditationTopics}
      />
      <NativeStack.Screen
        name={MeditationScreenName.MEDITATION_LIST}
        component={MeditationList}
      />
    </NativeStack.Navigator>
  );
};

export { Meditation };
