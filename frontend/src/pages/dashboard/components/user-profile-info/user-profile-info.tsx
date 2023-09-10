import avatar from '#assets/img/avatar-placeholder.png';
import { Sidebar } from '#libs/components/components.js';
import {
  Body,
  Header,
} from '#libs/components/sidebar/components/components.js';
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
    <Sidebar>
      <Header>
        <div className={styles['info']}>
          <span>Profile</span>
        </div>
      </Header>
      <Body>
        <div className={styles['user-info']}>
          <div className={styles['avatar-container']}>
            <img src={avatar} alt="avatar" className={styles['avatar']} />
          </div>
          <span className={styles['user-name']}>
            {(authenticatedUser as UserAuthResponseDto).fullName}
          </span>
        </div>
      </Body>
    </Sidebar>
  );
};

export { UserProfileInfo };
