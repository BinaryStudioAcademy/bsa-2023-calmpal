import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type RouteProp } from '@react-navigation/native';
import React from 'react';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Chat } from '#screens/chat/chat';
import { Home } from '#screens/home/home';

import { styles } from './styles';

const BottomTab = createBottomTabNavigator<TabNavigationParameterList>();

type TabBarStyle = {
  borderTopWidth: number;
  elevation: number;
  height: number;
  shadowColor: string;
};

type TabNavigatorOptions = {
  tabBarActiveTintColor: string;
  tabBarIcon: ({ color }: { color: string }) => React.ReactNode;
  tabBarInactiveTintColor: string;
  tabBarShowLabel: boolean;
  tabBarStyle: TabBarStyle;
};

const tabNavigatorOptions = ({
  route,
}: {
  route: RouteProp<TabNavigationParameterList>;
}): TabNavigatorOptions => ({
  tabBarActiveTintColor: AppColor.BLUE_200,
  tabBarIcon: ({ color }: { color: string }): React.ReactNode => {
    switch (route.name) {
      case MainScreenName.HOME: {
        return <HomeIcon color={color} />;
      }
      case MainScreenName.CHAT: {
        return <ChatIcon color={color} />;
      }
    }
  },
  tabBarInactiveTintColor: AppColor.GRAY_300,
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBarStyle,
});

const Main: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={tabNavigatorOptions}>
      <BottomTab.Screen name={MainScreenName.HOME} component={Home} />
      <BottomTab.Screen name={MainScreenName.CHAT} component={Chat} />
    </BottomTab.Navigator>
  );
};

export { Main };
