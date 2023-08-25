import avatar from '#assets/img/avatar.svg';
import buttonIcon from '#assets/img/buttonIcon.svg';

import { ProfileSettingsButton } from './profile-settings-button/profile-settings-button.js';
import styles from './styles.module.scss';

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
          <div className={styles['user-details']}>
            <div className={styles['user-icon']}>
              <img src={avatar} alt="avatar" />
            </div>
            <div className={styles['user-name']}>John Doe</div>
          </div>
        </div>
        <ProfileSettingsButton icon={buttonIcon}>Log Out</ProfileSettingsButton>
      </div>
    </div>
  );
};

export { ProfileSettingsSidebar };
