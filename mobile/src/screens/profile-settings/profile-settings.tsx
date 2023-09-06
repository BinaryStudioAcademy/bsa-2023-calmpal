import React from 'react';

import {
  Header,
  LinearGradient,
  ScrollView,
  Switch,
} from '#libs/components/components';
import { useAppForm } from '#libs/hooks/hooks';

import { Setting } from './components/components';
import { NOTIFICATION_SETTINGS_DEFAULT_VALUE } from './libs/constants';
import { styles } from './styles';

const ProfileSettings: React.FC = () => {
  const { control } = useAppForm({
    defaultValues: NOTIFICATION_SETTINGS_DEFAULT_VALUE,
  });

  return (
    <LinearGradient>
      <Header isArrowVisible />
      <ScrollView contentContainerStyle={styles.container}>
        <Setting
          label="Allow Notifications"
          controller={<Switch name="notification" control={control} />}
        />
      </ScrollView>
    </LinearGradient>
  );
};
export { ProfileSettings };
