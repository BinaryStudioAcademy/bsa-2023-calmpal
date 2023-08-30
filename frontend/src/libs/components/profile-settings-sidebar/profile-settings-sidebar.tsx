import { useCallback, useState } from 'react';

import { IconNameToIcon } from '#libs/enums/enums.js';

import { Icon } from '../components.js';
import { ProfileSettingsButton } from './profile-settings-button/profile-settings-button.js';
import styles from './styles.module.scss';

// In this component I used IconNameToIcon both as a type and as a value, had to try creating a type from a value for this case
type IconNameToIconType = (typeof IconNameToIcon)[keyof typeof IconNameToIcon];

const ProfileSettingsSidebar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<IconNameToIconType | null>(
    null,
  );

  const handleSignOutClick = useCallback(() => {
    setActiveButton(IconNameToIcon.SIGN_OUT);
  }, []);

  const handleNotificationClick = useCallback(() => {
    setActiveButton(IconNameToIcon.NOTIFICATION);
  }, []);

  const handleSubscriptionClick = useCallback(() => {
    setActiveButton(IconNameToIcon.SUBSCRIPTION);
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className="visually-hidden">Profile settings</div>
        <div className={styles['header-text']}>My Profile</div>
      </div>
      <div className={styles['divider']} />
      <div className={styles['body']}>
        <div className={styles['user']}>
          <div className="visually-hidden">User details</div>
          <div className={styles['user-details']}>
            <div className={styles['user-icon']}>
              <Icon name={IconNameToIcon.AVATAR} />
            </div>
            <div className={styles['user-name']}>John Doe</div>
          </div>
        </div>
        <div className={styles['buttons-container']}>
          <ProfileSettingsButton
            name={IconNameToIcon.NOTIFICATION}
            onClick={handleNotificationClick}
            isActive={activeButton === IconNameToIcon.NOTIFICATION}
          >
            Very long text to see if it will break
          </ProfileSettingsButton>

          <ProfileSettingsButton
            name={IconNameToIcon.SUBSCRIPTION}
            onClick={handleSubscriptionClick}
            isActive={activeButton === IconNameToIcon.SUBSCRIPTION}
          >
            Test
          </ProfileSettingsButton>

          <ProfileSettingsButton
            name={IconNameToIcon.SIGN_OUT}
            onClick={handleSignOutClick}
          >
            Sign Out
          </ProfileSettingsButton>
        </div>
      </div>
    </div>
  );
};

export { ProfileSettingsSidebar };
