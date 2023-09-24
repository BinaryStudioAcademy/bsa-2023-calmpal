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

import { AudioControls } from './components/audio-controls/audio-controls.js';
import { ProgressBar } from './components/progress-bar/progress-bar.js';
import { DEFAULT_AUDIO_OPTIONS } from './libs/constants/constants.js';
import { AudioOptionKey } from './libs/enums/enums.js';
import { type ReferenceProperties } from './libs/types/types.js';

type Properties<T> = {
  sourceName: keyof T;
  durationTimer: number | null;
  trackIndex: number;
  onSetTrackIndex: (index: number) => void;
  tracks: T[];
};

const AudioPlayer = <T,>({
  sourceName,
  durationTimer,
  trackIndex,
  tracks,
  onSetTrackIndex,
}: Properties<T>): JSX.Element => {
  const audioReference = useRef<HTMLAudioElement | null>(null);
  const progressBarReference = useRef<HTMLInputElement | null>(null);
  const audioControlsReference = useRef<ReferenceProperties | null>(null);

  const { watch, setValue } = useAppForm({
    defaultValues: { ...DEFAULT_AUDIO_OPTIONS, durationTimer },
    mode: 'onChange',
  });

  const handleLoadMetadata = useCallback((): void => {
    const seconds = (audioReference.current as HTMLAudioElement).duration;
    setValue(AudioOptionKey.DURATION, seconds);

    (progressBarReference.current as HTMLInputElement).max = seconds.toString();
  }, [setValue]);

  const handleNext = useCallback(() => {
    const nextTrackIndex = (trackIndex + TRACK_INCREMENT_INDEX) % tracks.length;
    onSetTrackIndex(nextTrackIndex);
  }, [trackIndex, tracks, onSetTrackIndex]);

  const currentDurationTimer = watch(AudioOptionKey.DURATION_TIMER);

  const { timeProgress, duration } = watch();

  const handleLoopTrack = useCallback((): void => {
    (audioReference.current as HTMLAudioElement).currentTime = TRACK_START_TIME;
    setValue(AudioOptionKey.TIME_PROGRESS, TRACK_START_TIME);
    setValue(
      AudioOptionKey.DURATION_TIMER,
      (currentDurationTimer as number) - timeProgress,
    );

    void (audioReference.current as HTMLAudioElement).play();
  }, [timeProgress, currentDurationTimer, setValue]);

  useEffect(() => {
    if (
      currentDurationTimer !== null &&
      currentDurationTimer - timeProgress <= TRACK_START_TIME
    ) {
      (audioReference.current as HTMLAudioElement).pause();
      (
        audioControlsReference.current as ReferenceProperties
      ).handlePausePlayer();

      setValue(
        AudioOptionKey.DURATION_TIMER,
        (durationTimer as number) + timeProgress,
      );
    }
  }, [timeProgress, durationTimer, currentDurationTimer, setValue]);

  const handleEndTrack = useCallback(() => {
    const lastDurationTimer =
      (currentDurationTimer ?? TRACK_START_TIME) - duration;

    if (lastDurationTimer > TRACK_START_TIME) {
      handleLoopTrack();
    } else {
      handleNext();
    }
  }, [currentDurationTimer, duration, handleNext, handleLoopTrack]);

  const handleTimeProgress = useCallback(
    (currentTime: number): void => {
      if (timeProgress !== currentTime) {
        setValue(AudioOptionKey.TIME_PROGRESS, currentTime);
      }
    },
    [timeProgress, setValue],
  );

  const audioSource = tracks[trackIndex]?.[sourceName] as string;

  return (
    <>
      <audio
        src={audioSource}
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
        tracks={tracks}
        onNextTrack={handleNext}
      />
    </>
  );
};

export { AudioPlayer };
