import { Icon } from '#libs/components/components.js';
import { IconNameToIcon } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import styles from './styles.module.scss';

type ProfileSettingsButtonProperties = {
  children: React.ReactNode;
  name: ValueOf<typeof IconNameToIcon>;
  onClick: () => void;
  isActive?: boolean;
};

const ProfileSettingsButton: React.FC<ProfileSettingsButtonProperties> = ({
  name,
  children,
  onClick,
  isActive = false,
}) => {
  return (
    <button className={styles['profile-button']} onClick={onClick}>
      <Icon name={name} />
      <div className={styles['text-container']}>
        <span className={styles['profile-button-text']}>{children}</span>
        {isActive && <Icon name={IconNameToIcon.ARROW} />}
      </div>
    </button>
  );
};

export { ProfileSettingsButton };
