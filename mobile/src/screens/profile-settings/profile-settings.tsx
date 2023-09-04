import React from 'react';

import {
  Header,
  LinearGradient,
  ScrollView,
  Switch,
} from '#libs/components/components';
import { useAppForm } from '#libs/hooks/hooks';
import { type NavigationScreenProperties } from '#libs/types/types';

import { Setting } from './components/components';
import { NOTIFICATION_SETTINGS_DEFAULT_VALUE } from './libs/constants';
import { styles } from './styles';

const ProfileSettings = ({
  route,
}: NavigationScreenProperties): JSX.Element => {
  const { control } = useAppForm({
    defaultValues: NOTIFICATION_SETTINGS_DEFAULT_VALUE,
  });

  return (
    <LinearGradient>
      <Header title={route.name} isArrowVisible />
      <ScrollView contentContainerStyle={styles.container}>
        <Setting
          label="Allow Notification"
          controller={<Switch name="notification" control={control} />}
        />
      </ScrollView>
    </LinearGradient>
  );
};
export { ProfileSettings };
