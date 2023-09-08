import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Card, LinearGradient, View } from '#libs/components/components';
import { AppColor, ProfileScreenName } from '#libs/enums/enums';
import { useNavigation } from '#libs/hooks/hooks';
import { type ProfileNavigationParameterList } from '#libs/types/types';

import { styles } from './styles';

const Profile: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<ProfileNavigationParameterList>>();

  const handleNotificationsPress = (): void => {
    navigation.navigate(ProfileScreenName.SETTINGS);
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
          onPress={handleNotificationsPress}
          iconColor={AppColor.WHITE}
          iconName="sign-out"
        />
      </View>
    </LinearGradient>
  );
};

export { Profile };
