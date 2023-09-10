import { Card, Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { useAppSelector, useCallback, useState } from '#libs/hooks/hooks.js';
import { type IconName, type SettingsOption } from '#libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import styles from './styles.module.scss';

const settingsOptions: SettingsOption[] = [
  {
    name: 'notification',
    title: 'Very long text to see if it will break',
    statusIcon: 'arrow',
  },
  { name: 'subscription', title: 'Test', statusIcon: 'arrow' },
];

const ProfileSettingsSidebar: React.FC = () => {
  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
    };
  });

  const [activeButton, setActiveButton] = useState<IconName | null>(null);

  const handleClick = useCallback((name: IconName) => {
    return () => {
      setActiveButton(name);
    };
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className="visually-hidden">Profile settings</div>
        <div className={styles['header-text']}>My Profile</div>
      </div>
      <div className={styles['body']}>
        <div className={styles['user']}>
          <div className="visually-hidden">User details</div>
          <div className={styles['user-details']}>
            <div className={styles['user-icon']}>
              <Icon name="avatar" color={IconColor.WHITE} />
            </div>
            <div className={styles['user-name']}>
              {authenticatedUser.fullName}
            </div>
          </div>
        </div>

        <div className={styles['buttons-container']}>
          <div className="visually-hidden">Profile settings options</div>
          {settingsOptions.map((option) => {
            return (
              <Card
                key={option.name}
                title={option.title}
                onClick={handleClick(option.name)}
                isActive={activeButton === option.name}
                iconName={option.name}
                iconColor={IconColor.WHITE}
                statusIcon={option.statusIcon}
              />
            );
          })}
          <Card
            title="Sign Out"
            onClick={handleClick('sign-out')}
            isActive={false}
            iconName="sign-out"
            iconColor={IconColor.WHITE}
            statusIcon="arrow"
          />
        </div>
      </div>
    </div>
  );
};

export { ProfileSettingsSidebar };
