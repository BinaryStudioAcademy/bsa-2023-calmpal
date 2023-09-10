import { useEffect, useState } from '#libs/hooks/hooks';
import { player } from '#libs/packages/player/player';

import { INTERVAL_DURATION, TRACK_START_TIME } from './libs/constants';

const usePlayerProgress = (): [number, number] => {
  const [position, setPosition] = useState(TRACK_START_TIME);
  const [duration, setDuration] = useState(TRACK_START_TIME);

  useEffect(() => {
    const getPlayerDetails = async (): Promise<void> => {
      const currentPosition = await player.getProgress();
      const currentDuration = await player.getDuration();
      setPosition(currentPosition);
      setDuration(currentDuration);
    };
    const interval = setInterval(() => {
      void getPlayerDetails();
    }, INTERVAL_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return [position, duration];
};

export { usePlayerProgress };
