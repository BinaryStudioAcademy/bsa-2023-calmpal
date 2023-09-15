import { Button } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import { TimerButton } from './components/timer-button/timer-button.js';
import { DURATION_UNIT, MEDITATION_DURATION } from './libs/constants.js';
import styles from './styles.module.scss';

type TimerProperties = {
  defaultDuration: string;
  onStartSession: () => void;
};

const MeditationTimer: React.FC<TimerProperties> = ({
  defaultDuration,
  onStartSession,
}) => {
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedDuration(event.target.value);
    },
    [],
  );

  return (
    <div className={styles['timer']}>
      <p className={styles['title']}>Choose Your Duration</p>
      <div className={styles['duration-container']}>
        {Object.keys(MEDITATION_DURATION).map((duration) => {
          return (
            <TimerButton
              key={duration}
              isActive={selectedDuration === duration}
              onChange={handleChange}
              value={duration}
              name="meditationDuration"
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
        onClick={onStartSession}
      />
    </div>
  );
};

export { MeditationTimer };
