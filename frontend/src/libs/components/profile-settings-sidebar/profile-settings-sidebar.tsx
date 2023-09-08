import { Card, Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { useAppSelector, useCallback, useState } from '#libs/hooks/hooks.js';
import { type IconName } from '#libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import styles from './styles.module.scss';

const ProfileSettingsSidebar: React.FC = () => {
  const userName = useAppSelector((state) => {
    const user = state.auth.authenticatedUser as UserAuthResponseDto;

    return user.fullName;
  });

  const [activeButton, setActiveButton] = useState<IconName | ''>('');

  const settingsOptions: { name: IconName; title: string }[] = [
    { name: 'notification', title: 'Very long text to see if it will break' },
    { name: 'subscription', title: 'Test' },
    { name: 'sign-out', title: 'Sign Out' },
  ];

  const handleOnClick = useCallback((name: IconName) => {
    return () => {
      setActiveButton(name);
    };
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
          {settingsOptions.map((option) => {
            return (
              <Card
                key={option.name}
                title={option.title}
                onClick={handleOnClick(option.name)}
                isActive={activeButton === option.name}
                iconName={option.name}
                iconColor={IconColor.WHITE}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ProfileSettingsSidebar };
