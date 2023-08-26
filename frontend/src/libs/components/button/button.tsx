import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  style?: 'submit';
};

const Button: React.FC<Properties> = ({ type = 'button', label, style }) => (
  <button type={type} className={styles[`${style}`]}>
    {label}
  </button>
);

export { Button };
