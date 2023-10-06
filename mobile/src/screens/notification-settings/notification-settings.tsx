import React from 'react';

import { ScrollView, Switch } from '#libs/components/components';
import { useAppForm } from '#libs/hooks/hooks';

import { Setting } from './components/components';
import { NOTIFICATION_SETTINGS_DEFAULT_VALUE } from './libs/cosntants/constants';
import { styles } from './styles';

const NotificationSettings: React.FC = () => {
  const { control } = useAppForm({
    defaultValues: NOTIFICATION_SETTINGS_DEFAULT_VALUE,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Setting
        label="Allow Notifications"
        controller={<Switch name="hasNotification" control={control} />}
      />
    </ScrollView>
  );
};

export { NotificationSettings };
