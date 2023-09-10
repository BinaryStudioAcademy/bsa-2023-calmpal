import styles from './style.module.scss';

type Properties = {
  children: React.ReactNode;
};

const Sidebar: React.FC<Properties> = ({ children }) => {
  return <div className={styles['container']}>{children}</div>;
};

export { Sidebar };
