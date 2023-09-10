import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const Body: React.FC<Properties> = ({ children }) => {
  return <div className={styles['body']}>{children}</div>;
};

export { Body };
