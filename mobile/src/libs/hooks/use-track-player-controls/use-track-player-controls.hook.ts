import TrackPlayer from 'react-native-track-player';

import { useCallback, useTrackPlayerProgress } from '../hooks';
import { TRACK_SKIP_SECONDS } from './libs/constants';

type Properties = {
  isPlaying: boolean;
};

type TrackPlayerControls = {
  handlePlayPause: () => void;
  handleSkipToNext: () => void;
  handleSkipToPrevious: () => void;
  handleSkipForward: () => void;
  handleSkipBackward: () => void;
  handleSeek: (value: number) => void;
};

const useTrackPlayerControls = ({
  isPlaying,
}: Properties): TrackPlayerControls => {
  const [timeProgress] = useTrackPlayerProgress();

  const handlePlayPause = useCallback(async (): Promise<void> => {
    await (isPlaying ? TrackPlayer.pause() : TrackPlayer.play());
  }, [isPlaying]);

  const handleSkipToNext = useCallback(async (): Promise<void> => {
    await TrackPlayer.skipToNext();
  }, []);

  const handleSkipToPrevious = useCallback(async (): Promise<void> => {
    await TrackPlayer.skipToPrevious();
  }, []);

  const handleSkipForward = useCallback(async (): Promise<void> => {
    await TrackPlayer.seekTo(timeProgress + TRACK_SKIP_SECONDS);
  }, [timeProgress]);

  const handleSkipBackward = useCallback(async (): Promise<void> => {
    await TrackPlayer.seekTo(timeProgress - TRACK_SKIP_SECONDS);
  }, [timeProgress]);

  const handleSeek = useCallback(async (value: number): Promise<void> => {
    await TrackPlayer.seekTo(value);
  }, []);

  return {
    handlePlayPause: (): void => {
      void handlePlayPause();
    },
    handleSkipToNext: (): void => {
      void handleSkipToNext();
    },
    handleSkipToPrevious: (): void => {
      void handleSkipToPrevious();
    },
    handleSkipForward: (): void => {
      void handleSkipForward();
    },
    handleSkipBackward: (): void => {
      void handleSkipBackward();
    },
    handleSeek: (value): void => {
      void handleSeek(value);
    },
  };
};

export { useTrackPlayerControls };
