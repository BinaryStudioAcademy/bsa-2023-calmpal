import React from 'react';

import ImagePlaceholder from '#assets/img/card-image-placeholder.png';
import MeditationBackground from '#assets/img/meditation-background.png';
import { Image, Text, View } from '#libs/components/components';

import { AudioPlayer } from './components/components';
import { styles } from './styles';

const Meditation: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Image source={MeditationBackground} style={styles.background} />
      <View style={styles.contentWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={ImagePlaceholder} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          Meditation for deep sleepa
        </Text>
        <Text style={styles.purpose}>Stress relief</Text>
        <AudioPlayer />
      </View>
    </View>
  );
};

export { Meditation };
