import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import HomeIcon from '#assets/img/icons/home.svg';
import MeditationIcon from '#assets/img/icons/meditations.svg';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Home } from '#screens/main/home';
import { Meditation } from '#screens/meditation/meditation';

import { styles } from './styles';

const BottomTab = createBottomTabNavigator<TabNavigationParameterList>();

const tabNavigatorOptions = {
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
  tabBarActiveTintColor: AppColor.BLUE_300,
  tabBarInactiveTintColor: AppColor.GRAY_400,
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBar,
};

const Main: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={tabNavigatorOptions}>
      <BottomTab.Screen
        name={MainScreenName.HOME}
        component={Home}
        options={{ tabBarIcon: HomeIcon }}
      />
      <BottomTab.Screen
        name={MainScreenName.MEDITATION}
        component={Meditation}
        options={{
          tabBarIcon: MeditationIcon,
          headerTitle: 'Meditation &  Breathing',
        }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
