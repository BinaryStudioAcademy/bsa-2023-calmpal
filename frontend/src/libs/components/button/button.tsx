import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
};

const Button: React.FC<Properties> = ({ type = 'button', label }) => (
  <button type={type} className={styles['submit']}>
    {label}
  </button>
);

export { Button };
