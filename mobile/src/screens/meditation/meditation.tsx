import React from 'react';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import meditationBackground from '#assets/img/meditation-background.png';
import { Image, Text, View } from '#libs/components/components';
import { useEffect, useState } from '#libs/hooks/hooks';
import { type Track } from '#libs/types/types';

import { Controls, ProgressBar } from './components/components';
import {
  MOCKED_PLAYLIST,
  TITLE_LINE_COUNT,
  TRACK_START_INDEX,
} from './libs/constants';
import { styles } from './styles';

const Meditation: React.FC = () => {
  const [playbackState, setPlaybackState] = useState<State | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const isPlaying = playbackState === State.Playing;

  useEffect(() => {
    const setPlaylist = async (): Promise<void> => {
      await TrackPlayer.reset();
      await TrackPlayer.add(MOCKED_PLAYLIST);
      setCurrentTrack(MOCKED_PLAYLIST[TRACK_START_INDEX] as Track);
    };

    void setPlaylist();
  }, []);

  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackTrackChanged],
    (event): void => {
      void (async (): Promise<void> => {
        if (event.type === Event.PlaybackState) {
          const state = await TrackPlayer.getState();
          setPlaybackState(state);
        } else if (typeof event.nextTrack === 'string') {
          const trackObject = await TrackPlayer.getTrack(event.nextTrack);
          if (trackObject) {
            setCurrentTrack(trackObject as Track);
          }
        }
      })();
    },
  );

  return (
    <View style={styles.wrapper}>
      <Image source={meditationBackground} style={styles.background} />
      <View style={styles.contentWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              currentTrack?.artwork
                ? { uri: currentTrack.artwork }
                : imagePlaceholder
            }
            style={styles.image}
          />
        </View>
        <Text style={styles.title} numberOfLines={TITLE_LINE_COUNT}>
          {currentTrack?.title}
        </Text>
        <Text style={styles.purpose}>{currentTrack?.artist}</Text>

        <ProgressBar isPlaying={isPlaying} />
        <Controls isPlaying={isPlaying} />
      </View>
    </View>
  );
};

export { Meditation };
