import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { Header, ScrollView, Switch, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useAppForm } from '#libs/hooks/hooks';
import { type NavigationScreenProperties } from '#libs/types/types';

import { Setting } from './components/components';
import { DEFAULT_NOTIFICATION_SETTINGS_VALUES } from './libs/constants';
import { styles } from './styles';

const ProfileSettings = ({
  navigation,
  route,
}: NavigationScreenProperties): JSX.Element => {
  const { control } = useAppForm({
    defaultValues: DEFAULT_NOTIFICATION_SETTINGS_VALUES,
  });

  return (
    <LinearGradient
      colors={[AppColor.WHITE, AppColor.BLUE_100]}
      style={styles.linearGradient}
    >
      <Header navigation={navigation} title={route.name} isArrowVisible />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.notificationsSection}>
          <Setting
            label="Allow Notification"
            controller={<Switch name="notification" control={control} />}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export { ProfileSettings };
