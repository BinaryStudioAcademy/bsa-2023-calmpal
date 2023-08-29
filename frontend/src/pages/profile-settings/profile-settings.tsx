import { Switch } from '#libs/components/components.js';
import { useAppForm } from '#libs/hooks/hooks.js';

import { Setting } from './components/components.js';
import { DEFAULT_NOTIFICATION_SETTINGS_VALUES } from './libs/constants.js';
import styles from './styles.module.scss';

const ProfileSettings: React.FC = () => {
  const { control } = useAppForm({
    defaultValues: DEFAULT_NOTIFICATION_SETTINGS_VALUES,
  });

  return (
    <div className={styles['page']}>
      <section className={styles['notifications-section']}>
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
    </div>
  );
};
export { ProfileSettings };
