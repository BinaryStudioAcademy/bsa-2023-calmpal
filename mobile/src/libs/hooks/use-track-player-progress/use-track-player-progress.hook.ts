import TrackPlayer from 'react-native-track-player';

import { useEffect, useState } from '#libs/hooks/hooks';

import { INTERVAL_DURATION, TRACK_START_TIME } from './libs/constants';

function useTrackPlayerProgress(): [number, number] {
  const [position, setPosition] = useState(TRACK_START_TIME);
  const [duration, setDuration] = useState(TRACK_START_TIME);

  useEffect(() => {
    const getPlayerDetails = async (): Promise<void> => {
      const pos = await TrackPlayer.getPosition();
      const dur = await TrackPlayer.getDuration();
      setPosition(pos);
      setDuration(dur);
    };

    const interval = setInterval(() => {
      void getPlayerDetails();
    }, INTERVAL_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return [position, duration];
}

export { useTrackPlayerProgress };
