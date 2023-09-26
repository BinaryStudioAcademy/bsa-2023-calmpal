import React from 'react';
import KeepAwake from 'react-native-keep-awake';

import { useAppDispatch, useEffect, useState } from '#libs/hooks/hooks';
import {
  Event,
  player,
  State,
  usePlayerEvents,
} from '#libs/packages/player/player';
import { actions as meditationActions } from '#slices/meditation/meditation';

import { Controls, ProgressBar } from './components/components';
import { TRACK_START_TIME } from './libs/constants/constants';

const Player: React.FC = () => {
  const [playbackState, setPlaybackState] = useState<State | null>(null);
  const isPlaying = playbackState === State.Playing;
  const dispatch = useAppDispatch();

  const handlePlaybackStateChange = async (): Promise<void> => {
    const state = await player.getState();
    setPlaybackState(state);
    if (isPlaying) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
  };

  const handleNextTrack = async (nextTrack: number): Promise<void> => {
    const track = await player.getTrack(nextTrack);
    if (track) {
      void dispatch(meditationActions.setSelectedMeditationEntry(track.id));
    }
  };

  usePlayerEvents(
    [Event.PlaybackState, Event.PlaybackTrackChanged],
    (event): void => {
      if (event.type === Event.PlaybackState) {
        void handlePlaybackStateChange();
      } else {
        void handleNextTrack(event.nextTrack);
      }
    },
  );

  useEffect(() => {
    void player.seek(TRACK_START_TIME);

    return () => {
      void player.stopPlaying();
      KeepAwake.deactivate();
    };
  }, []);

  return (
    <>
      <ProgressBar isPlaying={isPlaying} />
      <Controls isPlaying={isPlaying} />
    </>
  );
};

export { Player };
