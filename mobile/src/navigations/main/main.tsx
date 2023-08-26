import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import { HeaderTitle } from '#libs/components/components';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Chat } from '#screens/chat/chat';
import { Home } from '#screens/home/home';

import { styles } from './styles';

const BottomTab = createBottomTabNavigator<TabNavigationParameterList>();

const tabNavigatorOptions = {
  headerStyle: styles.headerStyle,
  tabBarActiveTintColor: AppColor.BLUE_300,
  tabBarInactiveTintColor: AppColor.GRAY_400,
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBarStyle,
};

const Main: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={tabNavigatorOptions}>
      <BottomTab.Screen
        name={MainScreenName.HOME}
        component={Home}
        options={{
          headerTitle: () => <HeaderTitle title={MainScreenName.HOME} />,
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name={MainScreenName.CHAT}
        component={Chat}
        options={{
          headerTitle: () => (
            <HeaderTitle title={MainScreenName.CHAT} isBadge />
          ),
          tabBarIcon: ({ color }) => <ChatIcon color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
