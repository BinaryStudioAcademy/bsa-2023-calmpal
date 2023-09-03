import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import MeditationIcon from '#assets/img/icons/meditations.svg';
import { Header } from '#libs/components/components';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Meditation } from '#navigations/navigations';
import { ChatList } from '#screens/chat-list/chat-list';
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
          tabBarIcon: HomeIcon,
          header: () => <Header />,
        }}
      />
      <BottomTab.Screen
        name={MainScreenName.CHAT_LIST}
        component={ChatList}
        options={{ tabBarIcon: ChatIcon }}
      />
      <BottomTab.Screen
        name={MainScreenName.MEDITATION}
        component={Meditation}
        options={{ tabBarIcon: MeditationIcon, headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
