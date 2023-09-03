import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  style?: 'primary' | 'secondary' | 'send-button';
  isLoading?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  style = 'primary',
  isLoading = false,
  children,
  onClick,
  isDisabled = false,
}) => (
  <button
    type={type}
    className={styles[style]}
    onClick={onClick}
    disabled={isDisabled || isLoading}
  >
    {isLoading && <span className={styles['loader']} />}
    {label}
    {children}
  </button>
);

export { Button };
