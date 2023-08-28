import styles from './styles.module.scss';

type Properties = {
  label: string;
  name: string;
  controller: React.ReactNode;
};

const Setting: React.FC<Properties> = ({ label, name, controller }) => {
  return (
    <label htmlFor={name} className={styles['container']}>
      <span className={styles['label']}>{label}</span>
      {controller}
    </label>
  );
};
export { Setting };
