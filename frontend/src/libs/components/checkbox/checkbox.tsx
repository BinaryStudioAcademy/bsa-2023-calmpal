import { type CheckboxStyle } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  label: string;
  isChecked?: boolean;
  onChange: () => void;
  style?: CheckboxStyle;
};

const Checkbox: React.FC<Properties> = ({
  label,
  isChecked,
  onChange,
  style = 'primary',
}) => {
  return (
    <label className={styles[`checkbox-container-${style}`]}>
      <input
        className={styles[`checkbox-${style}`]}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <div className={styles[`container-${style}`]}>
        <span className={styles[`label-${style}`]}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
