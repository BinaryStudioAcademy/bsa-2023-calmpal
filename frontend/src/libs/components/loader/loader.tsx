import styles from './loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ellipsis}>
        <div className={styles.child} />
        <div className={styles.child} />
        <div className={styles.child} />
        <div className={styles.child} />
      </div>
    </div>
  );
};

export { Loader };
