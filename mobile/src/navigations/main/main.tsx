import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';

import { HomeIcon } from '#assets/img/icons/icons';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Home } from '#screens/main/home';

import { styles } from './styles';

const BottomTab = createBottomTabNavigator<TabNavigationParameterList>();

const tabNavigatorOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: AppColor.BLUE_200,
  tabBarIcon: HomeIcon,
  tabBarInactiveTintColor: AppColor.GRAY_300,
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBarStyle,
};

const MainStack: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={tabNavigatorOptions}>
      <BottomTab.Screen name={MainScreenName.HOME} component={Home} />
    </BottomTab.Navigator>
  );
};

export { MainStack };
