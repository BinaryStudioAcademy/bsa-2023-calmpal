import { getFormatTime } from '#libs/helpers/helpers.js';
import { useCallback } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  progressBarReference: React.RefObject<HTMLInputElement | null>;
  audioReference: React.RefObject<HTMLAudioElement | null>;
  duration: number;
  timeProgress: number;
};

const ProgressBar: React.FC<Properties> = ({
  progressBarReference,
  audioReference,
  duration,
  timeProgress,
}) => {
  const handleProgressChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        if (audioReference.current && progressBarReference.current) {
          const newTime = Number.parseFloat(event.target.value);
          if (!Number.isNaN(newTime)) {
            audioReference.current.currentTime = newTime;
          }
        }
      },
      [audioReference, progressBarReference],
    );

  return (
    <div>
      <div className={styles['wrapper']}>
        <span className={styles['time']}>{getFormatTime(timeProgress)}</span>
        <span className={styles['time']}>{getFormatTime(duration)}</span>
      </div>
      <input
        className={styles['progress']}
        type="range"
        ref={progressBarReference as React.RefObject<HTMLInputElement>}
        defaultValue="0"
        onChange={handleProgressChange}
      />
    </div>
  );
};

export { ProgressBar };
