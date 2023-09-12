import React from 'react';

import { useEffect, useState } from '#libs/hooks/hooks';
import {
  Event,
  player,
  State,
  usePlayerEvents,
} from '#libs/packages/player/player';
import { type Track } from '#libs/types/types';

import { Controls, ProgressBar } from './components/components';
import {
  EMPTY_ARRAY_LENGTH,
  MOCKED_PLAYLIST,
  TRACK_START_INDEX,
} from './libs/constants';

type Properties = {
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>;
};

const Player: React.FC<Properties> = ({ setCurrentTrack }) => {
  const [playbackState, setPlaybackState] = useState<State | null>(null);
  const isPlaying = playbackState === State.Playing;

  useEffect(() => {
    const addPlaylist = async (): Promise<void> => {
      const trackQueue = await player.getQueue();
      if (trackQueue.length === EMPTY_ARRAY_LENGTH) {
        void player.setPlaylist(MOCKED_PLAYLIST);
      }

      setPlaybackState(await player.getState());
    };

    void addPlaylist();
    setCurrentTrack(MOCKED_PLAYLIST[TRACK_START_INDEX] as Track);
  }, [setCurrentTrack]);

  usePlayerEvents(
    [Event.PlaybackState, Event.PlaybackTrackChanged],
    (event): void => {
      void (async (): Promise<void> => {
        if (event.type === Event.PlaybackState) {
          const state = await player.getState();
          setPlaybackState(state);
        } else if (typeof event.nextTrack === 'string') {
          const track = await player.getTrack(event.nextTrack);
          if (track) {
            setCurrentTrack(track);
          }
        }
      })();
    },
  );

  return (
    <>
      <ProgressBar isPlaying={isPlaying} />
      <Controls isPlaying={isPlaying} />
    </>
  );
};

export { Player };
