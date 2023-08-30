import React from 'react';

import { ScrollView, Switch, View } from '#libs/components/components';
import { useAppForm } from '#libs/hooks/hooks';

import { Setting } from './components/components';
import { DEFAULT_NOTIFICATION_SETTINGS_VALUES } from './libs/constants';
import { styles } from './styles';

const ProfileSettings: React.FC = () => {
  const { control } = useAppForm({
    defaultValues: DEFAULT_NOTIFICATION_SETTINGS_VALUES,
  });

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.notificationsSection}>
        <Setting
          label="Allow Notification"
          controller={<Switch name="notification" control={control} />}
        />
      </View>
    </ScrollView>
  );
};
export { ProfileSettings };
