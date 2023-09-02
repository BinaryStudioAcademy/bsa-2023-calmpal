import { Icon } from '#libs/components/icon/icon.js';
import { type IconNames } from '#libs/enums/icon-name.enum.js';

import styles from './styles.module.scss';

type Properties = {
  icon: IconNames;
  onClick?: () => void;
  style: 'primary';
  type?: 'button' | 'submit';
};

const IconButton: React.FC<Properties> = ({
  type = 'button',
  icon,
  onClick,
  style = 'primary',
}) => {
  return (
    <button type={type} className={styles[style]} onClick={onClick}>
      <Icon name={icon} />
    </button>
  );
};

export { IconButton };
