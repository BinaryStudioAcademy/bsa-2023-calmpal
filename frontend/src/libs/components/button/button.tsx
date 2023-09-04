import { type IconName } from '#libs/types/icon-name.type.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  iconName?: IconName;
  style?: 'primary' | 'secondary' | 'rounded' | 'rounded-transparent';
  isLoading?: boolean;
  isDisabled?: boolean;
  accessabilityMessage?: string;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  iconName,
  style = 'primary',
  isLoading = false,
  isDisabled = false,
  accessabilityMessage = '',
  onClick,
}) => (
  <button
    type={type}
    className={styles[style]}
    onClick={onClick}
    disabled={isDisabled || isLoading}
  >
    {isLoading && <span className={styles['loader']} />}
    {label}
    {iconName && <Icon name={iconName} />}
    {accessabilityMessage && (
      <span className="visually-hidden">{accessabilityMessage}</span>
    )}
  </button>
);

export { Button };
