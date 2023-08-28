import { useAppSelector } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

const UserProfileChatSidebar: React.FC = () => {
  const { authenticatedUser } = useAppSelector(({ auth }) => ({
    authenticatedUser: auth.authenticatedUser,
  }));

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>Profile</div>
      <div className={styles['user-info']}>
        <img src="images/avatar.png" alt="not found" />
        <span className={styles['user-name']}>
          {authenticatedUser?.fullName}
        </span>
      </div>
    </div>
  );
};

export { UserProfileChatSidebar };
