import { Icon } from '#libs/components/components.js';
import { type IconNameToIcon } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import styles from './styles.module.scss';

type ProfileSettingsButtonProperties = {
  children: React.ReactNode;
  name: ValueOf<typeof IconNameToIcon>;
};

const ProfileSettingsButton: React.FC<ProfileSettingsButtonProperties> = ({
  name,
  children,
}) => {
  return (
    <button className={styles['profile-button']}>
      <Icon name={name} />
      <span className={styles['profile-button-text']}>{children}</span>
    </button>
  );
};

export { ProfileSettingsButton };
