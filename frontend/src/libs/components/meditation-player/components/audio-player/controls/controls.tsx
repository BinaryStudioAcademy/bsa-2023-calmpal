import { Button, Icon } from '#libs/components/components.js';
import {
  FULL_PERCENTAGE,
  PROGRESS_BAR,
  SKIP_STEP,
  STEP,
} from '#libs/components/meditation-player/libs/constants.js';
import { type Meditation } from '#libs/components/meditation-player/libs/types.js';
import { IconNameToIcon } from '#libs/enums/enums.js';
import { useCallback, useEffect, useRef, useState } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  audioReference: React.RefObject<HTMLAudioElement | null>;
  progressBarReference: React.RefObject<HTMLInputElement | null>;
  duration: number;
  onTimeProgress: (currentTime: number) => void;
  trackIndex: number;
  onSetTrackIndex: (index: number) => void;
  onSetCurrentTrack: (track: Meditation) => void;
  tracks: Meditation[];
  onNextTrack: () => void;
};

const Controls: React.FC<Properties> = ({
  audioReference,
  progressBarReference,
  duration,
  onTimeProgress,
  trackIndex,
  tracks,
  onSetCurrentTrack,
  onSetTrackIndex,
  onNextTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playAnimationReference = useRef<number | undefined>();

  const repeat = useCallback((): void => {
    if (!audioReference.current || !progressBarReference.current) {
      return;
    }

    const currentTime = audioReference.current.currentTime;
    onTimeProgress(currentTime);
    progressBarReference.current.value = currentTime.toString();
    progressBarReference.current.style.setProperty(
      PROGRESS_BAR,
      `${
        (Number(progressBarReference.current.value) / duration) *
        FULL_PERCENTAGE
      }%`,
    );

    playAnimationReference.current = requestAnimationFrame(repeat);
  }, [audioReference, duration, progressBarReference, onTimeProgress]);

  const handleSkipForward = useCallback(() => {
    if (audioReference.current) {
      audioReference.current.currentTime += SKIP_STEP;
    }
  }, [audioReference]);

  const handleSkipBackward = useCallback(() => {
    if (audioReference.current) {
      audioReference.current.currentTime -= SKIP_STEP;
    }
  }, [audioReference]);

  const handlePrevious = useCallback(() => {
    const previousTrackIndex =
      (trackIndex - STEP + tracks.length) % tracks.length;
    onSetTrackIndex(previousTrackIndex);
    onSetCurrentTrack(tracks[previousTrackIndex] as Meditation);
  }, [onSetCurrentTrack, onSetTrackIndex, trackIndex, tracks]);

  useEffect(() => {
    if (audioReference.current) {
      if (isPlaying) {
        void audioReference.current.play();
      } else {
        audioReference.current.pause();
      }
    }

    playAnimationReference.current = requestAnimationFrame(repeat);

    return () => {
      if (playAnimationReference.current) {
        cancelAnimationFrame(playAnimationReference.current);
      }
    };
  }, [isPlaying, audioReference, repeat]);

  const togglePlayPause = useCallback((): void => {
    setIsPlaying((previous) => !previous);
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['controls']}>
        <Button onClick={handlePrevious} style="rounded-transparent">
          <Icon name={IconNameToIcon.PREVIOUS} />
        </Button>
        <Button onClick={handleSkipBackward} style="rounded-transparent">
          <Icon name={IconNameToIcon.BACKWARD} />
        </Button>

        <Button onClick={togglePlayPause} style="rounded">
          {isPlaying ? (
            <Icon name={IconNameToIcon.PAUSE} />
          ) : (
            <Icon name={IconNameToIcon.PLAY} />
          )}
        </Button>
        <Button onClick={handleSkipForward} style="rounded-transparent">
          <Icon name={IconNameToIcon.FORWARD} />
        </Button>
        <Button onClick={onNextTrack} style="rounded-transparent">
          <Icon name={IconNameToIcon.NEXT} />
        </Button>
      </div>
    </div>
  );
};

export { Controls };
