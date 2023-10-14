import { player } from '~/libs/packages/player/player';

type Properties = {
  isPlaying: boolean;
};

type PlayerControls = {
  handlePlayPause: () => void;
  handleSkipToNext: () => void;
  handleSkipToPrevious: () => void;
  handleSkipForward: () => void;
  handleSkipBackward: () => void;
  handleSeek: (value: number) => void;
};

const usePlayerControls = ({ isPlaying }: Properties): PlayerControls => {
  return {
    handlePlayPause: (): void => {
      void player.playPause(isPlaying);
    },
    handleSkipToNext: (): void => {
      void player.skipToNext();
    },
    handleSkipToPrevious: (): void => {
      void player.skipToPrevious();
    },
    handleSkipForward: (): void => {
      void player.skipForward();
    },
    handleSkipBackward: (): void => {
      void player.skipBackward();
    },
    handleSeek: (value): void => {
      void player.seek(value);
    },
  };
};

export { usePlayerControls };
