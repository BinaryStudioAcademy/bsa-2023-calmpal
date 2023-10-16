import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from '~/libs/components/components';
import { ProfileScreenName } from '~/libs/enums/enums';
import { type ProfileNavigationParameterList } from '~/libs/types/types';
import { NotificationSettings } from '~/screens/notification-settings/notification-settings';
import { Profile } from '~/screens/profile/profile';

const NativeStack =
  createNativeStackNavigator<ProfileNavigationParameterList>();

const UserProfile: React.FC = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name={ProfileScreenName.PROFILE}
        component={Profile}
        options={{
          header: (): React.ReactNode => {
            return <Header isArrowVisible />;
          },
        }}
      />
      <NativeStack.Screen
        name={ProfileScreenName.SETTINGS}
        component={NotificationSettings}
        options={{
          header: (): React.ReactNode => {
            return <Header isArrowVisible />;
          },
        }}
      />
    </NativeStack.Navigator>
  );
};

export { UserProfile };
