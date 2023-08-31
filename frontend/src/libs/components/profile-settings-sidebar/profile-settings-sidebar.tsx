import { Icon } from '../components.js';
import { ProfileSettingsButton } from './profile-settings-button/profile-settings-button.js';
import styles from './styles.module.scss';

function handleClick(): void {
  // Placeholder
}

const ProfileSettingsSidebar: React.FC = () => {
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
              <Icon name={'avatar'} />
            </div>
            <div className={styles['user-name']}>John Doe</div>
          </div>
        </div>
        <div className={styles['buttons-container']}>
          <ProfileSettingsButton name={'notification'} onClick={handleClick}>
            Very long text to see if it will break
          </ProfileSettingsButton>

          <ProfileSettingsButton name={'subscription'} onClick={handleClick}>
            Test
          </ProfileSettingsButton>

          <ProfileSettingsButton name={'sign-out'} onClick={handleClick}>
            Sign Out
          </ProfileSettingsButton>
        </div>
      </div>
    </div>
  );
};

export { ProfileSettingsSidebar };
