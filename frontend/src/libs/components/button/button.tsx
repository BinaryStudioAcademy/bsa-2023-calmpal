import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  style?: 'primary' | 'secondary';
  disabled?: boolean;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  style = 'primary',
  disabled = false,
}) => (
  <button type={type} className={styles[style]} disabled={disabled}>
    {label}
  </button>
);

export { Button };
