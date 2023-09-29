import { getFormattedTime, getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  isActive: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  name: string;
  duration: number;
  unit: string;
  isDefault?: boolean;
};

const TimerButton: React.FC<Properties> = ({
  isActive,
  onChange,
  value,
  name,
  duration,
  unit,
  isDefault,
}) => {
  return (
    <label
      className={getValidClassNames(
        styles['timer-button'],
        isDefault && styles['default'],
        isActive && isDefault && styles['active-default'],
        isActive && !isDefault && styles['active'],
      )}
    >
      <input
        type="radio"
        value={value}
        name={name}
        checked={isActive}
        onChange={onChange}
        className={styles['radio-hidden']}
      />
      <div
        className={getValidClassNames(
          styles['button-content'],
          isActive && styles['active-text'],
        )}
      >
        <span>{getFormattedTime(duration, false)}</span>
        <span>{unit}</span>
      </div>
    </label>
  );
};

export { TimerButton };
