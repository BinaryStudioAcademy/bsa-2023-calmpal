import TrackPlayer, { RepeatMode, type State } from 'react-native-track-player';

import { type Track } from '#libs/types/types';

import {
  SECONDS_TO_MILLISECONDS,
  TRACK_SKIP_SECONDS,
} from './libs/constants/constants';

class Player {
  public getProgress = (): Promise<number> => {
    return TrackPlayer.getPosition();
  };

  public getDuration = (): Promise<number> => {
    return TrackPlayer.getDuration();
  };

  public getState = (): Promise<State> => {
    return TrackPlayer.getState();
  };

  public getTrack = async (trackIndex: number): Promise<Track | null> => {
    return (await TrackPlayer.getTrack(trackIndex)) as Track;
  };

  public startPlayer = async (): Promise<void> => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };

  public setPlaylist = async (playlist: Track[]): Promise<void> => {
    await TrackPlayer.reset();
    await TrackPlayer.add(playlist);
  };

  public getQueue = async (): Promise<Track[]> => {
    return (await TrackPlayer.getQueue()) as Track[];
  };

  public stopPlaying = async (): Promise<void> => {
    await TrackPlayer.pause();
  };

  public playPause = async (
    isPlaying: boolean,
    duration?: number,
  ): Promise<void> => {
    await (isPlaying ? TrackPlayer.pause() : TrackPlayer.play());

    if (duration) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          void TrackPlayer.pause();
          resolve();
        }, duration * SECONDS_TO_MILLISECONDS);
      });
    }
  };

  public skipToNext = async (): Promise<void> => {
    await TrackPlayer.skipToNext();
  };

  public skipToPrevious = async (): Promise<void> => {
    await TrackPlayer.skipToPrevious();
  };

  public skipForward = async (): Promise<void> => {
    await TrackPlayer.seekTo((await this.getProgress()) + TRACK_SKIP_SECONDS);
  };

  public skipBackward = async (): Promise<void> => {
    await TrackPlayer.seekTo((await this.getProgress()) - TRACK_SKIP_SECONDS);
  };

  public seek = async (value: number): Promise<void> => {
    await TrackPlayer.seekTo(value);
  };
}

export { Player };
export { Event, State, useTrackPlayerEvents } from 'react-native-track-player';
