import styles from './styles.module.scss';

type Properties = {
  label: string;
  controller: React.ReactNode;
};

const Setting: React.FC<Properties> = ({ label, controller }) => {
  return (
    <label className={styles['container']}>
      <span className={styles['label']}>{label}</span>
      {controller}
    </label>
  );
};

export { Setting };
