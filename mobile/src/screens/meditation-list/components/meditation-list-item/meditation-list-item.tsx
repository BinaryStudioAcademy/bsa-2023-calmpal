import React from 'react';

import ImagePlaceholder from '#assets/img/card-image-placeholder.png';
import Play from '#assets/img/icons/play.svg';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';

import { styles } from './styles';

type Properties = {
  title: string;
  duration: number;
};

const MeditationListItem: React.FC<Properties> = ({ title, duration }) => {
  return (
    <View style={styles.container}>
      <Image source={ImagePlaceholder} style={styles.image} />
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.duration}>{duration} min</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.playButton}>
            <Play color={AppColor.WHITE} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { MeditationListItem };
