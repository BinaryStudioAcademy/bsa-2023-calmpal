import { Icon } from '#libs/components/components.js';
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
      <Icon name={name} className={'profile-button-background'} />
      <div className={styles['text-container']}>
        <span className={styles['profile-button-text']}>{children}</span>
        {isActive && <Icon name="arrow" />}
      </div>
    </button>
  );
};

export { ProfileSettingsButton };
