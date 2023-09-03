import React from 'react';

import NotificationBellIcon from '#assets/img/icons/bell.svg';
import { Header, LinearGradient, View } from '#libs/components/components';
import { AppColor, RootScreenName } from '#libs/enums/enums';
import { type NavigationScreenProperties } from '#libs/types/types';

import { ProfileCategory } from './components/components';
import { styles } from './styles';

const Profile = ({
  navigation,
  route,
}: NavigationScreenProperties): JSX.Element => {
  const handleCategoryPress = (): void => {
    navigation.navigate(RootScreenName.SETTINGS);
  };

  return (
    <LinearGradient>
      <Header title={route.name} isArrowVisible />
      <View style={styles.container}>
        <ProfileCategory
          iconSourceSvg={<NotificationBellIcon color={AppColor.WHITE} />}
          title="Notifications and Reminders"
          onPress={handleCategoryPress}
        />
      </View>
    </LinearGradient>
  );
};

export { Profile };
