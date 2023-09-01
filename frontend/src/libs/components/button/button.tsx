import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  isLoading?: boolean;
};

const Button: React.FC<Properties> = ({
  label,
  type = 'button',
  isLoading = false,
}) => (
  <button type={type} className={styles['submit']} disabled={isLoading}>
    {isLoading && <span className={styles['loader']} />}
    {label}
  </button>
);

export { Button };
