import { useCallback, useState } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  groupName?: string;
  onChange: () => void;
  type?: 'checkbox' | 'radio';
  isChecked?: boolean;
};

const Checkbox: React.FC<Properties> = ({
  groupName = 'checkbox',
  label,
  onChange,
  type = 'checkbox',
  isChecked,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = useCallback(() => {
    onChange();
    setChecked(!checked);
  }, [checked, onChange]);

  return (
    <label>
      <input
        name={groupName}
        className={styles['checkbox']}
        type={type}
        onChange={handleChange}
        checked={checked}
      />
      <div className={styles['container']}>
        <span className={styles['label']}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
