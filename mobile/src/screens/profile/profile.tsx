import React from 'react';

import NotificationBellIcon from '#assets/img/icons/bell.svg';
import { View } from '#libs/components/components';

import { ProfileCategory } from './components/components';

const Profile: React.FC = () => {
  return (
    <View>
      <ProfileCategory
        iconSourceSvg={<NotificationBellIcon />}
        title="Notifications and Reminders"
      />
    </View>
  );
};

export { Profile };
