import styles from './styles.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ellipsis}>
        <div className={styles.child}></div>
        <div className={styles.child}></div>
        <div className={styles.child}></div>
        <div className={styles.child}></div>
      </div>
    </div>
  );
};

export { Loader };
