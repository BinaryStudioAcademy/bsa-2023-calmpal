import { useCallback, useEffect, useRef, useState } from '#libs/hooks/hooks.js';

import { Controls } from './controls/controls.js';
import { ProgressBar } from './progress-bar/progress-bar.js';
import styles from './styles.module.scss';

type Audio = {
  src: string;
};

type Properties = {
  audio: Audio;
};

const START_TIME = 0;

const AudioPlayer: React.FC<Properties> = ({ audio }) => {
  const [timeProgress, setTimeProgress] = useState<number>(START_TIME);
  const [duration, setDuration] = useState<number>(START_TIME);

  const audioReference = useRef<HTMLAudioElement | null>(null);
  const progressBarReference = useRef<HTMLInputElement | null>(null);

  const onLoadedMetadata = useCallback((): void => {
    if (audioReference.current) {
      const seconds = audioReference.current.duration;
      setDuration(seconds);

      if (progressBarReference.current) {
        progressBarReference.current.max = seconds.toString();
      }
    }
  }, []);

  useEffect(() => {
    const currentAudio = audioReference.current;

    if (currentAudio) {
      currentAudio.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('loadedmetadata', onLoadedMetadata);
      }
    };
  }, [onLoadedMetadata]);

  return (
    <div className={styles['wrapper']}>
      <audio
        src={audio.src}
        ref={audioReference}
        onLoadedMetadata={onLoadedMetadata}
      >
        <track kind="captions" />
      </audio>
      <ProgressBar
        progressBarReference={progressBarReference}
        audioReference={audioReference}
        timeProgress={timeProgress}
        duration={duration}
      />
      <Controls audioReference={audioReference} />
    </div>
  );
};

export { AudioPlayer };
