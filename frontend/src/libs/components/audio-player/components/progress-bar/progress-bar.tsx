import { forwardRef } from 'react';

import { getFormattedTime } from '#libs/helpers/helpers.js';
import { useCallback } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  audioReference: React.RefObject<HTMLAudioElement | null>;
  duration: number;
  timeProgress: number;
};

const ProgressBar: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  Properties
> = ({ audioReference, duration, timeProgress }, reference) => {
  const progressBarReference =
    reference as React.RefObject<HTMLInputElement | null>;

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
    <>
      <div className={styles['wrapper']}>
        <span className={styles['time']}>
          {getFormattedTime(timeProgress, false)}
        </span>
        <span className={styles['time']}>
          {getFormattedTime(duration, false)}
        </span>
      </div>
      <label className={styles['label']}>
        <span className="visually-hidden">A Meditation duration</span>
        <input
          className={styles['progress']}
          type="range"
          ref={reference}
          defaultValue="0"
          onChange={handleProgressChange}
        />
      </label>
    </>
  );
};

const ForwardedProgressBar = forwardRef(ProgressBar);
export { ForwardedProgressBar as ProgressBar };
