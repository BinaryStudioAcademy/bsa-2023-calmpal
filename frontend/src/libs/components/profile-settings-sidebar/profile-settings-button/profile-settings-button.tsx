import { Icon } from '#libs/components/components.js';
import { type IconNames } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { useCallback } from '#libs/hooks/hooks.js';

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

  const buttonStyle = getValidClassNames(
    styles['profile-button'],
    isActive && styles['focused'],
  );

  return (
    <button className={buttonStyle} onClick={handleOnClick}>
      <Icon name={name} className={'profile-button-background'} />
      <div className={styles['text-container']}>
        <span className={styles['profile-button-text']}>{children}</span>
        {isActive && <Icon name="arrow" />}
      </div>
    </button>
  );
};

export { ProfileSettingsButton };
