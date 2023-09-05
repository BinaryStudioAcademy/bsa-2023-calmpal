import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Header, Icon } from '#libs/components/components';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Chat } from '#navigations/navigations';
import { Home } from '#screens/home/home';

import { styles } from './styles';

const BottomTab = createBottomTabNavigator<TabNavigationParameterList>();

const tabNavigatorOptions = {
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
        options={{
          tabBarIcon: ({ color }): JSX.Element => {
            return <Icon name="home" color={color} />;
          },
          header: (): React.ReactNode => {
            return <Header />;
          },
        }}
      />
      <BottomTab.Screen
        name={MainScreenName.CHAT}
        component={Chat}
        options={{
          tabBarIcon: ({ color }): JSX.Element => {
            return <Icon name="chat" color={color} />;
          },
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
