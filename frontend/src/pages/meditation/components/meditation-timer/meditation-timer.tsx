import { Button } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';

import { TimerButton } from './components/timer-button/timer-button.js';
import { DURATION_UNIT, MEDITATION_DURATION } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  defaultDuration: string;
  onStartSession: (duration: string) => void;
};

const MeditationTimer: React.FC<Properties> = ({
  defaultDuration,
  onStartSession,
}) => {
  const { control } = useAppForm({
    defaultValues: { meditationDuration: defaultDuration },
  });

  const {
    field: { onChange, value },
  } = useFormController({ name: 'meditationDuration', control });

  const handleStartSession = useCallback(() => {
    onStartSession(value);
  }, [onStartSession, value]);

  return (
    <div className={styles['timer']}>
      <p className={styles['title']}>Choose Your Duration</p>
      <div className={styles['duration-container']}>
        {Object.keys(MEDITATION_DURATION).map((duration) => {
          return (
            <TimerButton
              key={duration}
              isActive={value === duration}
              onChange={onChange}
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
        onClick={handleStartSession}
      />
    </div>
  );
};

export { MeditationTimer };
