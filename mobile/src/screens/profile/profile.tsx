import React from 'react';

import NotificationBellIcon from '#assets/img/icons/bell.svg';
import { Header, LinearGradient, View } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
import { type NavigationScreenProperties } from '#libs/types/types';

import { ProfileCategory } from './components/components';
import { styles } from './styles';

const Profile = ({
  navigation,
  route,
}: NavigationScreenProperties): JSX.Element => {
  const onPress = (): void => {
    navigation.navigate(RootScreenName.SETTINGS);
  };

  return (
    <LinearGradient>
      <Header navigation={navigation} title={route.name} isArrowVisible />
      <View style={styles.container}>
        <ProfileCategory
          iconSourceSvg={<NotificationBellIcon />}
          title="Notifications and Reminders"
          onPress={onPress}
        />
      </View>
    </LinearGradient>
  );
};

export { Profile };
