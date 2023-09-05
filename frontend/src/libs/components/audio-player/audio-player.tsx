import { useCallback, useRef, useState } from '#libs/hooks/hooks.js';
import { type Meditation } from '#libs/types/types.js';
import {
  TRACK_INCREMENT_INDEX,
  TRACK_START_TIME,
} from '#pages/meditation/constants/constants.js';

import { AudioControls } from './components/audio-controls/audio-controls.js';
import { ProgressBar } from './components/progress-bar/progress-bar.js';

type Properties = {
  src: string;
  trackIndex: number;
  onSetTrackIndex: (index: number) => void;
  onSetCurrentTrack: (track: Meditation) => void;
  tracks: Meditation[];
};

const AudioPlayer: React.FC<Properties> = ({
  src,
  trackIndex,
  tracks,
  onSetCurrentTrack,
  onSetTrackIndex,
}) => {
  const [timeProgress, setTimeProgress] = useState(TRACK_START_TIME);
  const [duration, setDuration] = useState(TRACK_START_TIME);

  const audioReference = useRef<HTMLAudioElement | null>(null);
  const progressBarReference = useRef<HTMLInputElement | null>(null);

  const handleLoadedMetadata = useCallback((): void => {
    if (audioReference.current) {
      const seconds = audioReference.current.duration;
      setDuration(seconds);

      if (progressBarReference.current) {
        progressBarReference.current.max = seconds.toString();
      }
    }
  }, []);

  const handleTimeProgress = useCallback((currentTime: number): void => {
    setTimeProgress(currentTime);
  }, []);

  const handleNext = useCallback(() => {
    const nextTrackIndex = (trackIndex + TRACK_INCREMENT_INDEX) % tracks.length;
    onSetTrackIndex(nextTrackIndex);
    onSetCurrentTrack(tracks[nextTrackIndex] as Meditation);
  }, [onSetCurrentTrack, onSetTrackIndex, trackIndex, tracks]);

  return (
    <>
      <audio
        src={src}
        ref={audioReference}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
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
        audioReference={audioReference}
        progressBarReference={progressBarReference}
        duration={duration}
        onTimeProgress={handleTimeProgress}
        trackIndex={trackIndex}
        onSetTrackIndex={onSetTrackIndex}
        onSetCurrentTrack={onSetCurrentTrack}
        tracks={tracks}
        onNextTrack={handleNext}
      />
    </>
  );
};

export { AudioPlayer };
