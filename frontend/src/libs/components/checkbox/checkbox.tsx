import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  isChecked?: boolean;
  onChange: () => void;
  isDefaultStyleDisabled?: boolean;
};

const Checkbox: React.FC<Properties> = ({
  label,
  isChecked,
  onChange,
  isDefaultStyleDisabled,
}) => {
  const checkboxClassName = getValidClassNames(
    !isDefaultStyleDisabled && styles['checkbox'],
  );
  const containerClassName = getValidClassNames(
    !isDefaultStyleDisabled && styles['container'],
  );
  const labelClassName = getValidClassNames(
    !isDefaultStyleDisabled && styles['label'],
  );
  const checkboxContainerClassName = getValidClassNames(
    isDefaultStyleDisabled && styles['checkbox-container'],
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
