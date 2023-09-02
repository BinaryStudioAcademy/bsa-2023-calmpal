import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import NotificationBellIcon from '#assets/img/icons/bell.svg';
import { Header, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { type NavigationScreenProperties } from '#libs/types/types';

import { ProfileCategory } from './components/components';
import { styles } from './styles';

const Profile = ({
  navigation,
  route,
}: NavigationScreenProperties): JSX.Element => {
  return (
    <LinearGradient
      colors={[AppColor.WHITE, AppColor.BLUE_100]}
      style={styles.linearGradient}
    >
      <Header navigation={navigation} title={route.name} />
      <View style={styles.container}>
        <ProfileCategory
          iconSourceSvg={<NotificationBellIcon />}
          title="Notifications and Reminders"
        />
      </View>
    </LinearGradient>
  );
};

export { Profile };
