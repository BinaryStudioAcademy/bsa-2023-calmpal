import { Button } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import { TimerButton } from './components/duration-button/timer-button.js';
import { DURATION_UNIT, MEDITATION_DURATION } from './libs/constants.js';
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
            <TimerButton
              key={duration}
              isActive={selectedDuration === duration}
              onClick={handleClick(duration)}
            >
              <div
                className={getValidClassNames(
                  styles['button-content'],
                  selectedDuration === duration && styles['active-text'],
                )}
              >
                <span>
                  {
                    MEDITATION_DURATION[
                      duration as keyof typeof MEDITATION_DURATION
                    ]
                  }
                </span>
                <span>{DURATION_UNIT.MINUTES}</span>
              </div>
            </TimerButton>
          );
        })}
      </div>
      <Button
        style="start-button"
        label="Start meditation session"
        onClick={onClose}
      />
    </div>
  );
};

export { MeditationTimer };
