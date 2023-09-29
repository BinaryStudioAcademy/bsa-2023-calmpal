import { type ForwardedRef } from 'react';

import { Button } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from '#libs/hooks/hooks.js';
import {
  FULL_PERCENTAGE,
  PROGRESS_BAR,
  TRACK_INCREMENT_INDEX,
  TRACK_SKIP_SECONDS,
} from '#pages/meditation/libs/constants/constants.js';

import { type AudioControlsHandler } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  audioReference: React.RefObject<HTMLAudioElement | null>;
  progressBarReference: React.RefObject<HTMLInputElement | null>;
  duration: number;
  onTimeProgress: (currentTime: number) => void;
  trackIndex: number;
  onSetTrackIndex: (index: number) => void;
  tracksCount: number;
  onNextTrack: () => void;
};

const AudioControls = (
  {
    audioReference,
    progressBarReference,
    duration,
    onTimeProgress,
    trackIndex,
    tracksCount,
    onSetTrackIndex,
    onNextTrack,
  }: Properties,
  reference: ForwardedRef<AudioControlsHandler>,
): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimationReference = useRef<number | null>(null);

  useImperativeHandle(reference, () => {
    return {
      handlePausePlayer: (): void => {
        setIsPlaying(false);
      },
      handleResumePlayer: (): void => {
        setIsPlaying(true);
      },
    };
  });

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
      (trackIndex - TRACK_INCREMENT_INDEX + tracksCount) % tracksCount;
    onSetTrackIndex(previousTrackIndex);
  }, [onSetTrackIndex, trackIndex, tracksCount]);

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
          iconColor={IconColor.BLUE_200}
          iconHeight={24}
          iconWidth={24}
          label="Play previous meditation"
          isLabelVisuallyHidden
        />
        <div className={styles['button-wrapper']}>
          <Button
            onClick={handleSkipBackward}
            style="rounded-transparent"
            iconName="backward"
            iconColor={IconColor.BLUE_200}
            iconHeight={40}
            iconWidth={40}
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
            iconColor={IconColor.BLUE_200}
            iconHeight={40}
            iconWidth={40}
            label="Forward 30 seconds"
            isLabelVisuallyHidden
          />
        </div>
        <Button
          onClick={onNextTrack}
          style="rounded-transparent"
          iconName="next"
          iconColor={IconColor.BLUE_200}
          iconHeight={24}
          iconWidth={24}
          label="Play next meditation"
          isLabelVisuallyHidden
        />
      </div>
    </div>
  );
};

const ForwardedAudioControls = forwardRef(AudioControls);

export { ForwardedAudioControls as AudioControls };
