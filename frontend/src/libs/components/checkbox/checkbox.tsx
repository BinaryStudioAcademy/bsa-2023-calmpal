import styles from './styles.module.scss';

type Properties = {
  label: string;
  onChange: () => void;
};

const Checkbox: React.FC<Properties> = ({ label, onChange }) => {
  return (
    <label className={styles['container']}>
      <input
        className={styles['checkbox']}
        type="checkbox"
        onChange={onChange}
      />
      <span className={styles['label']}>{label}</span>
    </label>
  );
};

export { Checkbox };
