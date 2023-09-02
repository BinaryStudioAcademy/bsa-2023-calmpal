import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  style?: 'primary' | 'secondary' | 'send-button';
  isLoading?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  style = 'primary',
  isLoading = false,
  children,
  onClick,
}) => (
  <button
    type={type}
    className={styles[style]}
    disabled={isLoading}
    onClick={onClick}
  >
    {isLoading && <span className={styles['loader']} />}
    {label}
    {children}
  </button>
);

export { Button };
