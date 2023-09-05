import { Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/icon-color.enum.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback } from '#libs/hooks/hooks.js';
import { type IconName } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  name: IconName;
  onClick: (name: IconName) => void;
  isActive?: boolean;
};

const ProfileSettingsButton: React.FC<Properties> = ({
  name,
  children,
  onClick,
  isActive = false,
}) => {
  const handleClick = useCallback(() => {
    onClick(name);
  }, [name, onClick]);

  const buttonStyle = getValidClassNames(
    styles['profile-button'],
    isActive && styles['focused'],
  );

  return (
    <button className={buttonStyle} onClick={handleClick}>
      <div className={styles['icon-background']}>
        <Icon name={name} color={IconColor.BLUE} />
      </div>
      <div className={styles['text-container']}>
        <span className={styles['profile-button-text']}>{children}</span>
        {isActive && <Icon name="arrow" color={IconColor.BLUE} />}
      </div>
    </button>
  );
};

export { ProfileSettingsButton };
