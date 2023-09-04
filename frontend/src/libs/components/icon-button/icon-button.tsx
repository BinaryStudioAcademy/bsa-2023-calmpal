import { Icon } from '#libs/components/icon/icon.js';
import { type IconName } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  icon: IconName;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const IconButton: React.FC<Properties> = ({
  type = 'button',
  icon,
  onClick,
}) => {
  return (
    <button type={type} className={styles['primary']} onClick={onClick}>
      <Icon name={icon} />
    </button>
  );
};

export { IconButton };
