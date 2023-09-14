import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type TimerButtonProperties = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const TimerButton: React.FC<TimerButtonProperties> = ({
  isActive,
  onClick,
  children,
}) => {
  return (
    <button
      className={getValidClassNames(
        styles['duration-button'],
        isActive ? styles['active'] : '',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { TimerButton };
