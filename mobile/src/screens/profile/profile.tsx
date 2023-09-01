import React from 'react';

import NotificationBellIcon from '#assets/img/icons/bell.svg';
import { View } from '#libs/components/components';

import { ProfileCategory } from './components/components';
import { styles } from './styles';

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <ProfileCategory
        iconSourceSvg={<NotificationBellIcon />}
        title="Notifications and Reminders"
      />
    </View>
  );
};

export { Profile };
