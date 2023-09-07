import { Button } from '#libs/components/components.js';
import { useCallback, useEffect, useRef, useState } from '#libs/hooks/hooks.js';
import { type Meditation } from '#libs/types/types.js';
import {
  FULL_PERCENTAGE,
  PROGRESS_BAR,
  TRACK_INCREMENT_INDEX,
  TRACK_SKIP_SECONDS,
} from '#pages/meditation/libs/constants/constants.js';

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

const AudioControls: React.FC<Properties> = ({
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
      audioReference.current.currentTime += TRACK_SKIP_SECONDS;
    }
  }, [audioReference]);

  const handleSkipBackward = useCallback(() => {
    if (audioReference.current) {
      audioReference.current.currentTime -= TRACK_SKIP_SECONDS;
    }
  }, [audioReference]);

  const handlePrevious = useCallback(() => {
    const previousTrackIndex =
      (trackIndex - TRACK_INCREMENT_INDEX + tracks.length) % tracks.length;
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
          label="Play previous meditation"
          isLabelVisuallyHidden
        />
        <div className={styles['button-wrapper']}>
          <Button
            onClick={handleSkipBackward}
            style="rounded-transparent"
            iconName="backward"
            label="Back 30 seconds"
            isLabelVisuallyHidden
          />

          <Button
            onClick={handlePlayToggle}
            style="rounded"
            iconName={isPlaying ? 'pause' : 'audio-play-icon'}
            label="Play or pause a meditation"
            isLabelVisuallyHidden
          />
          <Button
            onClick={handleSkipForward}
            style="rounded-transparent"
            iconName="forward"
            label="Forward 30 seconds"
            isLabelVisuallyHidden
          />
        </div>
        <Button
          onClick={onNextTrack}
          style="rounded-transparent"
          iconName="next"
          label="Play next meditation"
          isLabelVisuallyHidden
        />
      </div>
    </div>
  );
};

export { AudioControls };
