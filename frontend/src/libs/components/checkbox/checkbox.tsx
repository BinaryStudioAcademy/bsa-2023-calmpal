import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  checked?: boolean;
  name?: string;
  onChange: () => void;
  disableDefaultStyles?: boolean;
};

const Checkbox: React.FC<Properties> = ({
  label,
  checked,
  name,
  onChange,
  disableDefaultStyles,
}) => {
  const checkboxClassName = getValidClassNames(
    disableDefaultStyles ? null : styles['checkbox'],
  );
  const containerClassName = getValidClassNames(
    disableDefaultStyles ? null : styles['container'],
  );
  const labelClassName = getValidClassNames(
    disableDefaultStyles ? null : styles['label'],
  );
  const checkboxContainerClassName = getValidClassNames(
    disableDefaultStyles ? styles['checkbox-container'] : null,
  );

  return (
    <label className={checkboxContainerClassName}>
      <input
        className={checkboxClassName}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <div className={containerClassName}>
        <span className={labelClassName}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
