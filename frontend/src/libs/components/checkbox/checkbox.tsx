import styles from './styles.module.scss';

type Properties = {
  label: string;
  onChange: () => void;
};

const Checkbox: React.FC<Properties> = ({ label, onChange }) => {
  return (
    <label>
      <input
        className={styles['checkbox']}
        type="checkbox"
        onChange={onChange}
      />
      <div className={styles['container']}>
        <span className={styles['label']}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
