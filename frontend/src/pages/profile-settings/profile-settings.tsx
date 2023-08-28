import { Switch } from '#libs/components/components.js';
import { useAppForm } from '#libs/hooks/hooks.js';

import { Setting } from './components/components.js';
import styles from './styles.module.scss';

const ProfileSettings: React.FC = () => {
  const { control } = useAppForm({ defaultValues: { notification: true } });

  return (
    <div className={styles['page']}>
      <section className={styles['notifications-section']}>
        <Setting
          label="Allow Notification"
          name="notification"
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
