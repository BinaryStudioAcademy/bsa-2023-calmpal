import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type CheckboxStyle } from '#libs/types/types.js';

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
  const checkboxClassName = getValidClassNames(styles[`checkbox-${style}`]);
  const containerClassName = getValidClassNames(styles[`container-${style}`]);
  const labelClassName = getValidClassNames(styles[`label-${style}`]);
  const checkboxContainerClassName = getValidClassNames(
    styles[`checkbox-container-${style}`],
  );

  return (
    <label className={checkboxContainerClassName}>
      <input
        className={checkboxClassName}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <div className={containerClassName}>
        <span className={labelClassName}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
