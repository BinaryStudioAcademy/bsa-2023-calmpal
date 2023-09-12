import { Card, Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useState,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { SETTINGS_OPTIONS } from './libs/constants.js';
import styles from './styles.module.scss';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
    };
  });

  const [activeItem, setActiveItem] = useState<string | null>('notification');

  const handleClick = useCallback((key: string) => {
    return () => {
      setActiveItem(key);
    };
  }, []);

  const handleSignOut = useCallback((): void => {
    void dispatch(authActions.signOut());
  }, [dispatch]);

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
              <Icon name="user" color={IconColor.WHITE} />
            </div>
            <div className={styles['user-name']}>
              {authenticatedUser.fullName}
            </div>
          </div>
        </div>

        <div className={styles['buttons-container']}>
          <div className="visually-hidden">Profile settings options</div>
          {SETTINGS_OPTIONS.map((option) => {
            return (
              <Card
                key={option.key}
                title={option.title}
                onClick={handleClick(option.key)}
                isActive={activeItem === option.key}
                iconName={option.key}
                iconColor={IconColor.WHITE}
              />
            );
          })}
          <Card
            title="Sign Out"
            onClick={handleSignOut}
            iconName="sign-out"
            iconColor={IconColor.WHITE}
          />
        </div>
      </div>
    </div>
  );
};

export { UserProfile };
