import { useCallback } from 'react';

import { Icon } from '#libs/components/components.js';
import { type IconNames } from '#libs/enums/enums.js';

import styles from './styles.module.scss';

type ProfileSettingsButtonProperties = {
  children: React.ReactNode;
  name: IconNames;
  onClick: (name: IconNames) => void;
  isActive?: boolean;
};

const ProfileSettingsButton: React.FC<ProfileSettingsButtonProperties> = ({
  name,
  children,
  onClick,
  isActive = false,
}) => {
  const handleOnClick = useCallback(() => {
    onClick(name);
  }, [name, onClick]);

  const buttonStyle = isActive
    ? `${styles['profile-button']} ${styles['focused']}`
    : styles['profile-button'];

  return (
    <button className={buttonStyle} onClick={handleOnClick}>
      <Icon name={name} className={'profile-button-background'} />
      <div className={styles['text-container']}>
        <span className={styles['profile-button-text']}>{children}</span>
        {isActive && <Icon name={'arrow'} />}
      </div>
    </button>
  );
};

export { ProfileSettingsButton };
