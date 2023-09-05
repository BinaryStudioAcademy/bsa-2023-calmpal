import { type IconName } from '#libs/types/icon-name.type.js';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  style?: 'primary' | 'secondary';
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: IconName | '';
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  style = 'primary',
  icon = '',
  isLoading = false,
  isDisabled = false,
  onClick,
}) => {
  return icon ? (
    <button type={type} className={styles['icon-primary']}>
      <Icon name={icon} />
    </button>
  ) : (
    <button
      type={type}
      className={styles[style]}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <span className={styles['loader']} />}
      {label}
    </button>
  );
};

export { Button };
