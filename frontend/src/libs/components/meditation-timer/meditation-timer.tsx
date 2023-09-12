import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import { DURATION_UNIT, MEDITATION_DURATION } from './constants/constants.js';
import styles from './styles.module.scss';

type TimerProperties = {
  onClose: () => void;
  defaultDuration: string;
};

const MeditationTimer: React.FC<TimerProperties> = ({
  onClose,
  defaultDuration,
}) => {
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration);

  const handleClick = useCallback((duration: string) => {
    return () => {
      setSelectedDuration(duration);
    };
  }, []);

  return (
    <div className={styles['timer']}>
      <p className={styles['title']}>Choose Your Duration</p>
      <div className={styles['duration-container']}>
        {Object.keys(MEDITATION_DURATION).map((duration) => {
          return (
            <button
              key={duration}
              className={getValidClassNames(
                styles['duration-button'],
                selectedDuration === duration ? styles['active'] : '',
              )}
              onClick={handleClick(duration)}
            >
              <span
                className={getValidClassNames(
                  styles['duration-value'],
                  selectedDuration === duration ? styles['active-text'] : '',
                )}
              >
                {
                  MEDITATION_DURATION[
                    duration as keyof typeof MEDITATION_DURATION
                  ]
                }
              </span>
              <span
                className={getValidClassNames(
                  styles['duration-unit'],
                  selectedDuration === duration ? styles['active-text'] : '',
                )}
              >
                {DURATION_UNIT.MINUTES}
              </span>
            </button>
          );
        })}
      </div>
      <button className={styles['start-button']} onClick={onClose}>
        Start Session
      </button>
    </div>
  );
};

export { MeditationTimer };
