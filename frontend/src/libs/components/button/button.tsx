import { type ReactNode } from 'react';

import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  children?: ReactNode;
  style?: 'primary' | 'secondary' | 'rounded' | 'rounded-transparent';
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  children,
  style = 'primary',
  isLoading = false,
  isDisabled = false,
  onClick,
}) => (
  <button
    type={type}
    className={styles[style]}
    onClick={onClick}
    disabled={isDisabled || isLoading}
  >
    {isLoading && <span className={styles['loader']} />}
    {label ?? children}
  </button>
);

export { Button };
