import { Button } from '#libs/components/components.js';
import { useCallback, useEffect, useRef, useState } from '#libs/hooks/hooks.js';
import { type Meditation } from '#libs/types/types.js';

import {
  FULL_PERCENTAGE,
  PROGRESS_BAR,
  SKIP_STEP,
  STEP,
} from '../../constants/constants.js';
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
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimationReference = useRef<number | null>(null);

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

  const handlePlayToggle = useCallback((): void => {
    setIsPlaying((previous) => {
      return !previous;
    });
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['controls']}>
        <Button
          onClick={handlePrevious}
          style="rounded-transparent"
          iconName="previous"
          accessabilityMessage="Play previous meditation"
        />
        <div className={styles['button-wrapper']}>
          <Button
            onClick={handleSkipBackward}
            style="rounded-transparent"
            iconName="backward"
            accessabilityMessage="Back 30 seconds"
          />

          <Button
            onClick={handlePlayToggle}
            style="rounded"
            iconName={isPlaying ? 'pause' : 'play'}
            accessabilityMessage="Play or pause a meditation"
          />
          <Button
            onClick={handleSkipForward}
            style="rounded-transparent"
            iconName="forward"
            accessabilityMessage="Forward 30 seconds"
          />
        </div>
        <Button
          onClick={onNextTrack}
          style="rounded-transparent"
          iconName="next"
          accessabilityMessage="Play next meditation"
        />
      </div>
    </div>
  );
};

export { Controls };
