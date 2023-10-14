import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Card, LinearGradient, View } from '~/libs/components/components';
import { AppColor, ProfileScreenName } from '~/libs/enums/enums';
import { useAppDispatch, useNavigation } from '~/libs/hooks/hooks';
import { type ProfileNavigationParameterList } from '~/libs/types/types';
import { actions as authActions } from '~/slices/auth/auth';

import { styles } from './styles';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NavigationProp<ProfileNavigationParameterList>>();

  const handleNotificationsPress = (): void => {
    navigation.navigate(ProfileScreenName.SETTINGS);
  };

  const handleSignOutPress = (): void => {
    void dispatch(authActions.signOut());
  };

  return (
    <LinearGradient>
      <View style={styles.container}>
        <Card
          title="Notifications and Reminders"
          onPress={handleNotificationsPress}
          iconColor={AppColor.WHITE}
          iconName="bell"
        />
        <Card
          title="Sign Out"
          onPress={handleSignOutPress}
          iconColor={AppColor.WHITE}
          iconName="sign-out"
        />
      </View>
    </LinearGradient>
  );
};

export { Profile };
