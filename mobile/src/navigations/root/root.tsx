import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { HomeIcon } from '#assets/img/icons/icons';
import { AppColor, RootScreenName } from '#libs/enums/enums';
import {
  type RootNavigationParameterList,
  type TabNavigationParameterList,
} from '#libs/types/types';
import { Auth } from '#screens/auth/auth';
import { Home } from '#screens/main/home';

import { styles } from './styles';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();
const BottomTab = createBottomTabNavigator<TabNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const tabNavigatorOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: AppColor.BLUE_200,
  tabBarIcon: HomeIcon,
  tabBarInactiveTintColor: AppColor.GRAY_300,
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBarStyle,
};

const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={tabNavigatorOptions}>
      <BottomTab.Screen name={RootScreenName.HOME} component={Home} />
    </BottomTab.Navigator>
  );
};

const Root: React.FC = () => {
  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
      <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
      <NativeStack.Screen
        name={RootScreenName.MAIN}
        component={BottomTabsNavigator}
      />
    </NativeStack.Navigator>
  );
};

export { Root };
