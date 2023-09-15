import { Button } from '#libs/components/components.js';
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
              duration={
                MEDITATION_DURATION[
                  duration as keyof typeof MEDITATION_DURATION
                ]
              }
              unit={DURATION_UNIT.MINUTES}
            />
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
