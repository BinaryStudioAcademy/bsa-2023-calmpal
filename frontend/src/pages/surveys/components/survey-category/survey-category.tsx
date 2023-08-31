import { useCallback } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  onChange: (label: string) => void;
};

const SurveyCategory: React.FC<Properties> = ({
  label,
  onChange,
}): JSX.Element => {
  const handleChange = useCallback(() => {
    onChange(label);
  }, [label, onChange]);

  return (
    <label className={styles['option']}>
      <input
        className={styles['checkbox']}
        type="checkbox"
        onChange={handleChange}
      />
      <span className={styles['label']}>{label}</span>
    </label>
  );
};

export { SurveyCategory };
