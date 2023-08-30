import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import ImagePlaceholder from '#assets/img/card-image-placeholder.png';
import Play from '#assets/img/icons/play.svg';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  title: string;
  duration: number;
};

const MeditationItem: React.FC<Properties> = ({ title, duration }) => {
  return (
    <View style={styles.container}>
      <Image
        source={ImagePlaceholder as ImageSourcePropType}
        style={styles.image}
      />
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.duration}>{duration} min</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.playButton}>
            <Play />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { MeditationItem };
