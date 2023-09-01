import { type ReactNode } from 'react';

import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  children?: ReactNode;
  style?: 'submit' | 'rounded' | 'rounded-transparent';
  isLoading?: boolean;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  children,
  style = 'submit',
  isLoading = false,
  onClick,
}) => (
  <button
    type={type}
    className={styles[style]}
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading && <span className={styles['loader']} />}
    {label ?? children}
  </button>
);

export { Button };
