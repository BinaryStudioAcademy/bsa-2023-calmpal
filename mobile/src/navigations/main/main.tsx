import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type RouteProp } from '@react-navigation/native';
import React from 'react';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import { HeaderTitle } from '#libs/components/components';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import {
  type TabNavigationParameterList,
  type TabNavigatorOptions,
} from '#libs/types/types';
import { Chat } from '#screens/chat/chat';
import { Home } from '#screens/home/home';

import { styles } from './styles';

const BottomTab = createBottomTabNavigator<TabNavigationParameterList>();

const Main: React.FC = () => {
  const tabNavigatorOptions = ({
    route,
  }: {
    route: RouteProp<TabNavigationParameterList>;
  }): TabNavigatorOptions => ({
    tabBarActiveTintColor: AppColor.BLUE_300,
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
    headerStyle: styles.headerStyle,
    tabBarInactiveTintColor: AppColor.GRAY_400,
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBarStyle,
  });

  return (
    <BottomTab.Navigator screenOptions={tabNavigatorOptions}>
      <BottomTab.Screen
        name={MainScreenName.HOME}
        component={Home}
        options={{
          headerTitle: () => <HeaderTitle title={MainScreenName.HOME} />,
        }}
      />
      <BottomTab.Screen
        name={MainScreenName.CHAT}
        component={Chat}
        options={{
          headerTitle: () => (
            <HeaderTitle title={MainScreenName.CHAT} isBadge={true} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
