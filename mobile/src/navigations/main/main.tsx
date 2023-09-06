import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import { Header } from '#libs/components/components';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Chat } from '#navigations/navigations';
import { Dashboard } from '#screens/home/home';

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
        name={MainScreenName.DASHBOARD}
        component={Dashboard}
        options={{
          tabBarIcon: HomeIcon,
          header: (): React.ReactNode => {
            return <Header />;
          },
        }}
      />
      <BottomTab.Screen
        name={MainScreenName.CHAT_LIST}
        component={Chat}
        options={{ tabBarIcon: ChatIcon, headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
