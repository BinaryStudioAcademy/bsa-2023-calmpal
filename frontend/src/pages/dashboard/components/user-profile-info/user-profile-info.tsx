import avatar from '~/assets/img/avatar-placeholder.png';
import { Sidebar } from '~/libs/components/components.js';
import {
  SidebarBody,
  SidebarHeader,
} from '~/libs/components/sidebar/components/components.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import styles from './styles.module.scss';

const UserProfileInfo: React.FC = () => {
  const fullName = useAppSelector(({ auth }) => {
    return (auth.authenticatedUser as UserAuthResponseDto).fullName;
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <div className={styles['info']}>
          <span>Home</span>
        </div>
      </SidebarHeader>
      <SidebarBody>
        <div className={styles['user-info']}>
          <div className={styles['avatar-container']}>
            <img src={avatar} alt="avatar" className={styles['avatar']} />
          </div>
          <span className={styles['user-name']}>{fullName}</span>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export { UserProfileInfo };
