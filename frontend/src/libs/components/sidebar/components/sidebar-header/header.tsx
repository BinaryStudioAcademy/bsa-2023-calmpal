import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const Header: React.FC<Properties> = ({ children }) => {
  return <div className={styles['header']}>{children}</div>;
};

export { Header };
