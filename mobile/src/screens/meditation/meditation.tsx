import React from 'react';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import meditationBackground from '#assets/img/meditation-background.png';
import { Image, Text, View } from '#libs/components/components';
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
    void player.setPlaylist(MOCKED_PLAYLIST);
    setCurrentTrack(MOCKED_PLAYLIST[TRACK_START_INDEX] as Track);
  }, []);

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
