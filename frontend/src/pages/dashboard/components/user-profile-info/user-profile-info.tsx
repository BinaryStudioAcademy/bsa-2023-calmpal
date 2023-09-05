import avatar from '#assets/img/avatar-placeholder.png';
import { useAppSelector } from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import styles from './styles.module.scss';

const UserProfileInfo: React.FC = () => {
  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser,
    };
  });

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>Profile</div>
      <div className={styles['user-info']}>
        <div className={styles['avatar-container']}>
          <img src={avatar} alt="avatar" className={styles['avatar']} />
        </div>
        <span className={styles['user-name']}>
          {(authenticatedUser as UserAuthResponseDto).fullName}
        </span>
      </div>
    </div>
  );
};

export { UserProfileInfo };
