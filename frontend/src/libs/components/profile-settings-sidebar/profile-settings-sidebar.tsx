import { IconColor } from '#libs/enums/icon-color.enum.js';
import { useAppSelector, useCallback, useState } from '#libs/hooks/hooks.js';
import { type IconName } from '#libs/types/types.js';

import { Icon } from '../components.js';
import { ProfileSettingsButton } from './profile-settings-button/profile-settings-button.js';
import styles from './styles.module.scss';

const ProfileSettingsSidebar: React.FC = () => {
  const userName = useAppSelector((state) => {
    return state.auth.authenticatedUser?.fullName;
  });

  const [activeButton, setActiveButton] = useState<string>('');

  const handleOnClick = useCallback((name: IconName) => {
    setActiveButton(name);
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header-container']}>
        <div className={styles['header']}>
          <div className="visually-hidden">Profile settings</div>
          <div className={styles['header-text']}>My Profile</div>
        </div>
        <div className={styles['user']}>
          <div className="visually-hidden">User details</div>
          <div className={styles['user-details']}>
            <div className={styles['user-icon']}>
              <Icon name="avatar" color={IconColor.WHITE} />
            </div>
            <div className={styles['user-name']}>{userName}</div>
          </div>
        </div>
      </div>

      <div className={styles['body']}>
        <div className={styles['buttons-container']}>
          <div className="visually-hidden">Profile settings options</div>
          <ProfileSettingsButton
            name="notification"
            onClick={handleOnClick}
            isActive={activeButton === 'notification'}
          >
            Very long text to see if it will break
          </ProfileSettingsButton>

          <ProfileSettingsButton
            name="subscription"
            onClick={handleOnClick}
            isActive={activeButton === 'subscription'}
          >
            Test
          </ProfileSettingsButton>

          <ProfileSettingsButton name="sign-out" onClick={handleOnClick}>
            Sign Out
          </ProfileSettingsButton>
        </div>
      </div>
    </div>
  );
};

export { ProfileSettingsSidebar };
