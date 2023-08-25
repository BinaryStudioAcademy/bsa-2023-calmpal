import styles from './styles.module.scss';

const Loader: React.FC = () => {
  const { container, ellipsis, child } = styles;

  return (
    <div className={container}>
      <div className={ellipsis}>
        <div className={child} />
        <div className={child} />
        <div className={child} />
        <div className={child} />
      </div>
    </div>
  );
};

export { Loader };
