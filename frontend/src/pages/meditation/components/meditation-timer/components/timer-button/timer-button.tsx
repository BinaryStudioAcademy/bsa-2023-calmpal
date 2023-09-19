import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  isActive: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  duration: string;
  unit: string;
};

const TimerButton: React.FC<Properties> = ({
  isActive,
  onChange,
  value,
  name,
  duration,
  unit,
}) => {
  return (
    <label
      className={getValidClassNames(
        styles['timer-button'],
        isActive && styles['active'],
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
        <span>{duration}</span>
        <span>{unit}</span>
      </div>
    </label>
  );
};

export { TimerButton };
