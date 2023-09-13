import { Button } from '#libs/components/components.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';
import { type ButtonStyle } from '#libs/types/types.js';

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
            <Button
              key={duration}
              label={`${
                MEDITATION_DURATION[
                  duration as keyof typeof MEDITATION_DURATION
                ]
              }
              ${DURATION_UNIT.MINUTES}`}
              style={[
                'duration-button',
                selectedDuration === duration ? 'active' : ('' as ButtonStyle),
              ]}
              onClick={handleClick(duration)}
            />
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
