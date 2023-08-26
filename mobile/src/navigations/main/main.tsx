import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { type RouteProp } from '@react-navigation/native';
import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import {
  type TabNavigationParameterList,
  type TabNavigatorOptions,
} from '#libs/types/types';
import { Chat } from '#screens/chat/chat';
import { ChatHeader } from '#screens/chat/components/components';
import { HomeHeader } from '#screens/home/components/components';
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
    headerTitleStyle: styles.headerTitleStyle,
    tabBarInactiveTintColor: AppColor.GRAY_300,
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBarStyle,
  });

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
        }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
