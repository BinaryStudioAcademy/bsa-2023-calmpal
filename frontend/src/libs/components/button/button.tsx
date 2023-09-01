import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  style?: 'primary' | 'secondary';
  isLoading?: boolean;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  style = 'primary',
  isLoading = false,
}) => (
  <button type={type} className={styles[style]} disabled={isLoading}>
    {isLoading && <span className={styles['loader']} />}
    {label}
  </button>
);

export { Button };
