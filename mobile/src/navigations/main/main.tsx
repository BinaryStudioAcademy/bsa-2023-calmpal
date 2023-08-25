import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { type RouteProp } from '@react-navigation/native';
import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Chat } from '#screens/chat/chat';
import { ChatHeader } from '#screens/chat/components/components';
import { HomeHeader } from '#screens/home/components/components';
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
  tabBarInactiveTintColor: AppColor.GRAY_300,
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBarStyle,
});

const Main: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={tabNavigatorOptions}>
      <BottomTab.Screen
        name={MainScreenName.HOME}
        component={Home}
        options={{
          header: ({ route, options }): React.ReactNode => {
            const title = getHeaderTitle(options, route.name);

            return (
              <HomeHeader
                title={title}
                headerStyle={options.headerStyle as StyleProp<ViewStyle>}
                titleStyle={options.headerTitleStyle as StyleProp<ViewStyle>}
              />
            );
          },
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <BottomTab.Screen
        name={MainScreenName.CHAT}
        component={Chat}
        options={{
          header: ({ route, options }): React.ReactNode => {
            const title = getHeaderTitle(options, route.name);

            return (
              <ChatHeader
                title={title}
                headerStyle={options.headerStyle as StyleProp<ViewStyle>}
                titleStyle={options.headerTitleStyle as StyleProp<ViewStyle>}
              />
            );
          },
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
