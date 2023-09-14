import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type TimerButtonProperties = {
  isActive: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  children: React.ReactNode;
};

const TimerButton: React.FC<TimerButtonProperties> = ({
  isActive,
  onChange,
  value,
  name,
  children,
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
      {children}
    </label>
  );
};

export { TimerButton };
