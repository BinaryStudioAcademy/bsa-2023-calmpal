import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import JournalIcon from '#assets/img/icons/journal.svg';
import MeditationIcon from '#assets/img/icons/meditations.svg';
import { Header } from '#libs/components/components';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { Chat, Journal, Meditation } from '#navigations/navigations';
import { Dashboard } from '#screens/dashboard/dashboard';

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
        component={Dashboard}
        options={{
          tabBarIcon: HomeIcon,
          header: (): React.ReactNode => {
            return <Header isProfileVisible />;
          },
        }}
      />
      <BottomTab.Screen
        name={MainScreenName.CHAT}
        component={Chat}
        options={{ tabBarIcon: ChatIcon, headerShown: false }}
      />
      <BottomTab.Screen
        name={MainScreenName.MEDITATION}
        component={Meditation}
        options={{ tabBarIcon: MeditationIcon, headerShown: false }}
      />
      <BottomTab.Screen
        name={MainScreenName.JOURNAL}
        component={Journal}
        options={{
          tabBarIcon: JournalIcon,
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
