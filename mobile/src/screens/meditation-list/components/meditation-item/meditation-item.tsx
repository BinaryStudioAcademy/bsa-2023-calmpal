import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import cardImagePlaceholder from '#assets/img/card-image-placeholder.png';
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
  img?: ImageSourcePropType;
  id: number;
  onClick: (id: number) => void;
};

const MeditationItem: React.FC<Properties> = ({
  title,
  duration,
  img = cardImagePlaceholder,
  id,
  onClick,
}) => {
  const handleClick = (): void => {
    onClick(id);
  };

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.duration}>{duration} min</Text>
        </View>
        <TouchableOpacity onPress={handleClick}>
          <View style={styles.playButton}>
            <Play color={AppColor.WHITE} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { MeditationItem };
