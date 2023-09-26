import {
  useAppForm,
  useCallback,
  useEffect,
  useRef,
} from '#libs/hooks/hooks.js';
import {
  TRACK_INCREMENT_INDEX,
  TRACK_START_TIME,
} from '#pages/meditation/libs/constants/constants.js';

import { AudioControls, ProgressBar } from './components/components.js';
import { DEFAULT_AUDIO_OPTIONS } from './libs/constants/constants.js';
import { AudioOptionKey } from './libs/enums/enums.js';
import { type AudioControlsHandler } from './libs/types/types.js';

type Properties = {
  mediaUrl: string;
  timerDuration: number | null;
  trackIndex: number;
  onSetTrackIndex: (index: number) => void;
  tracksCount: number;
};

const AudioPlayer: React.FC<Properties> = ({
  mediaUrl,
  timerDuration,
  trackIndex,
  tracksCount,
  onSetTrackIndex,
}: Properties): JSX.Element => {
  const audioReference = useRef<HTMLAudioElement | null>(null);
  const progressBarReference = useRef<HTMLInputElement | null>(null);
  const audioControlsReference = useRef<AudioControlsHandler | null>(null);

  const { watch, setValue } = useAppForm({
    defaultValues: { ...DEFAULT_AUDIO_OPTIONS, timerDuration },
    mode: 'onChange',
  });

  const handleLoadMetadata = useCallback((): void => {
    const seconds = (audioReference.current as HTMLAudioElement).duration;
    setValue(AudioOptionKey.DURATION, seconds);

    (progressBarReference.current as HTMLInputElement).max = seconds.toString();
  }, [setValue]);

  const handleNext = useCallback(() => {
    const nextTrackIndex = (trackIndex + TRACK_INCREMENT_INDEX) % tracksCount;
    onSetTrackIndex(nextTrackIndex);
  }, [trackIndex, tracksCount, onSetTrackIndex]);

  const currentTimerDuration = watch(AudioOptionKey.TIMER_DURATION);

  const { timeProgress, duration } = watch();

  const handleLoopTrack = useCallback((): void => {
    (audioReference.current as HTMLAudioElement).currentTime = TRACK_START_TIME;
    setValue(AudioOptionKey.TIME_PROGRESS, TRACK_START_TIME);
    setValue(
      AudioOptionKey.TIMER_DURATION,
      (currentTimerDuration as number) - timeProgress,
    );

    void (audioReference.current as HTMLAudioElement).play();
  }, [timeProgress, currentTimerDuration, setValue]);

  useEffect(() => {
    if (
      currentTimerDuration !== null &&
      currentTimerDuration - timeProgress <= TRACK_START_TIME
    ) {
      (audioReference.current as HTMLAudioElement).pause();
      (
        audioControlsReference.current as AudioControlsHandler
      ).handlePausePlayer();

      setValue(
        AudioOptionKey.TIMER_DURATION,
        (timerDuration as number) + timeProgress,
      );
    }
  }, [timeProgress, timerDuration, currentTimerDuration, setValue]);

  const handleEndTrack = useCallback(() => {
    const lastDurationTimer =
      (currentTimerDuration ?? TRACK_START_TIME) - duration;

    if (lastDurationTimer > TRACK_START_TIME) {
      handleLoopTrack();
    } else {
      handleNext();
    }
  }, [currentTimerDuration, duration, handleNext, handleLoopTrack]);

  const handleTimeProgress = useCallback(
    (currentTime: number): void => {
      if (timeProgress !== currentTime) {
        setValue(AudioOptionKey.TIME_PROGRESS, currentTime);
      }
    },
    [timeProgress, setValue],
  );

  return (
    <>
      <audio
        src={mediaUrl}
        ref={audioReference}
        onLoadedMetadata={handleLoadMetadata}
        onEnded={handleEndTrack}
      >
        <track kind="captions" />
      </audio>
      <ProgressBar
        ref={progressBarReference}
        audioReference={audioReference}
        timeProgress={timeProgress}
        duration={duration}
      />
      <AudioControls
        ref={audioControlsReference}
        audioReference={audioReference}
        progressBarReference={progressBarReference}
        duration={duration}
        onTimeProgress={handleTimeProgress}
        trackIndex={trackIndex}
        onSetTrackIndex={onSetTrackIndex}
        tracksCount={tracksCount}
        onNextTrack={handleNext}
      />
    </>
  );
};

export { AudioPlayer };
