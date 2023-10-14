import { Button } from '~/libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '~/libs/hooks/hooks.js';

import {
  DURATION_UNIT,
  MEDITATION_DURATION,
} from '../../libs/constants/constants.js';
import { TimerButton } from './components/components.js';
import styles from './styles.module.scss';

type DurationKey = keyof typeof MEDITATION_DURATION;

type Properties = {
  defaultDuration: number;
  onStartSession: (duration: number) => void;
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
  } = useFormController({
    name: 'meditationDuration',
    control,
  });

  const handleStartSession = useCallback(() => {
    onStartSession(value);
  }, [onStartSession, value]);

  const numberedValue = Number(value);
  const startButtonText =
    numberedValue === defaultDuration
      ? 'Start with default duration'
      : 'Start with selected duration';

  return (
    <div className={styles['timer']}>
      <p className={styles['title']}>Choose Your Duration</p>
      <div className={styles['duration-container']}>
        {Object.keys(MEDITATION_DURATION).map((durationKey) => {
          const duration = MEDITATION_DURATION[durationKey as DurationKey];

          return (
            <TimerButton
              key={duration}
              isActive={numberedValue === duration}
              onChange={onChange}
              value={duration}
              name="Meditation Duration"
              duration={duration}
              unit={DURATION_UNIT.MINUTES}
            />
          );
        })}
        <TimerButton
          isActive={numberedValue === defaultDuration}
          onChange={onChange}
          value={defaultDuration}
          name="Meditation Duration"
          duration={defaultDuration}
          unit={DURATION_UNIT.MINUTES}
          isDefault
        />
      </div>
      <Button
        style="start-button"
        label={startButtonText}
        onClick={handleStartSession}
      />
    </div>
  );
};

export { MeditationTimer };
