import React from 'react';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import meditationBackground from '#assets/img/meditation-background.png';
import { Image, PLayer, Text, View } from '#libs/components/components';
import { useState } from '#libs/hooks/hooks';
import { type Track } from '#libs/types/types';

import { TITLE_LINE_COUNT } from './libs/constants';
import { styles } from './styles';

const Meditation: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

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

        <PLayer setCurrentTrack={setCurrentTrack} />
      </View>
    </View>
  );
};

export { Meditation };
