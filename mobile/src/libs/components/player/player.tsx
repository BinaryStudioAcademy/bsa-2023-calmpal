import React from 'react';
import KeepAwake from 'react-native-keep-awake';

import { useEffect, useState } from '#libs/hooks/hooks';
import {
  Event,
  player,
  State,
  usePlayerEvents,
} from '#libs/packages/player/player';
import { type Track } from '#libs/types/types';

import { Controls, ProgressBar } from './components/components';
import { MOCKED_PLAYLIST, TRACK_START_INDEX } from './libs/constants';

type Properties = {
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>;
};

const Player: React.FC<Properties> = ({ setCurrentTrack }) => {
  const [playbackState, setPlaybackState] = useState<State | null>(null);
  const isPlaying = playbackState === State.Playing;

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
      setCurrentTrack(track);
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
    return () => {
      void player.stopPlaying();
      KeepAwake.deactivate();
    };
  }, []);

  useEffect(() => {
    void player.setPlaylist(MOCKED_PLAYLIST);
    setCurrentTrack(MOCKED_PLAYLIST[TRACK_START_INDEX] as Track);
  }, [setCurrentTrack]);

  return (
    <>
      <ProgressBar isPlaying={isPlaying} />
      <Controls isPlaying={isPlaying} />
    </>
  );
};

export { Player };
