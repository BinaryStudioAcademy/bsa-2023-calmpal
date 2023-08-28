import BackwardIcon from '/images/icon-30-next.svg';
import ForwardIcon from '/images/icon-30-previews.svg';
import PreviousIcon from '/images/last-play-fill.svg';
import NextIcon from '/images/next-play-fill.svg';
import PauseIcon from '/images/pause.svg';
import PlayIcon from '/images/play.svg';
import { useCallback, useEffect, useState } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  audioReference: React.RefObject<HTMLAudioElement | null>;
};

const Controls: React.FC<Properties> = ({ audioReference }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (audioReference.current) {
      if (isPlaying) {
        const playPromise = audioReference.current.play();
        playPromise.catch((error) => {
          console.error('Playback error:', error);
        });
      } else {
        audioReference.current.pause();
      }
    }
  }, [isPlaying, audioReference]);

  const togglePlayPause = useCallback((): void => {
    setIsPlaying((previous) => !previous);
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div className="controls">
        <button>
          <img src={PreviousIcon} alt="Previous" />
        </button>
        <button>
          <img src={BackwardIcon} alt="Backward in 30 sec" />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <img src={PauseIcon} alt="Play" />
          ) : (
            <img src={PlayIcon} alt="Pause" />
          )}
        </button>
        <button>
          <img src={ForwardIcon} alt="Forward in 30 sec" />
        </button>
        <button>
          <img src={NextIcon} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export { Controls };
