import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from '#libs/components/components';
import { ProfileScreenName } from '#libs/enums/enums';
import { type ProfileNavigationParameterList } from '#libs/types/types';
import { Profile } from '#screens/profile/profile';
import { ProfileSettings } from '#screens/profile-settings/profile-settings';

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
        component={ProfileSettings}
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
