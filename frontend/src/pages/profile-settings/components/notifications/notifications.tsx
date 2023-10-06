import { Switch } from '#libs/components/components.js';
import { useAppForm } from '#libs/hooks/hooks.js';
import { DEFAULT_NOTIFICATION_SETTINGS_VALUES } from '#pages/profile-settings/libs/constants/constants.js';

import { Setting } from '../components.js';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {
  const { control } = useAppForm({
    defaultValues: DEFAULT_NOTIFICATION_SETTINGS_VALUES,
  });

  return (
    <section className={styles['section']}>
      <Setting
        label="Allow Notification"
        controller={
          <Switch
            name="notification"
            label="Allow notification switch"
            control={control}
          />
        }
      />
    </section>
  );
};

export { Notifications };
