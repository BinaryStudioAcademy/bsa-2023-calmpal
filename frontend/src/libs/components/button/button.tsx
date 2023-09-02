import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  style?: 'primary' | 'secondary' | 'send-button';
  isLoading?: boolean;
  children?: React.ReactNode;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  style = 'primary',
  isLoading = false,
  children,
}) => (
  <button type={type} className={styles[style]} disabled={isLoading}>
    {isLoading && <span className={styles['loader']} />}
    {label}
    {children}
  </button>
);

export { Button };
