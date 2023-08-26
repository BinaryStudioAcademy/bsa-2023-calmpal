import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
};

const Button: React.FC<Properties> = ({ type = 'button', label }) => (
  <button type={type} className={styles['button']}>
    {label}
  </button>
);

export { Button };
