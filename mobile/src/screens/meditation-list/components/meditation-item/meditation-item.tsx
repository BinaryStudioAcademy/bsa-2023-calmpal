import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import cardImagePlaceholder from '~/assets/img/card-image-placeholder.png';
import Play from '~/assets/img/icons/play.svg';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from '~/libs/components/components';
import { AppColor } from '~/libs/enums/enums';

import { styles } from './styles';

type Properties = {
  title: string;
  img?: ImageSourcePropType;
  onClick: () => void;
};

const MeditationItem: React.FC<Properties> = ({
  title,
  img = cardImagePlaceholder,
  onClick,
}) => {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onClick}>
          <View style={styles.playButton}>
            <Play color={AppColor.WHITE} width={12} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { MeditationItem };
