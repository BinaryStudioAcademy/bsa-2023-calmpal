import styles from './styles.module.scss';

type Properties = {
  label: string;
  onChange: () => void;
  type?: 'checkbox' | 'radio';
};

const Checkbox: React.FC<Properties> = ({
  label,
  onChange,
  type = 'checkbox',
}) => {
  return (
    <label>
      <input
        name="checkbox"
        className={styles['checkbox']}
        type={type}
        onChange={onChange}
      />
      <div className={styles['container']}>
        <span className={styles['label']}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
