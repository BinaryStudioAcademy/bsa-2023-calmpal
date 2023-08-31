import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import { Image, Text, TouchableOpacity } from '#libs/components/components';

import { DEFAULT_NUMBER_OF_LINES } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title: string;
  image?: ImageSourcePropType;
  onPress: () => void;
};

const Card: React.FC<Properties> = ({
  title,
  image = imagePlaceholder as ImageSourcePropType,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text
        style={styles.title}
        numberOfLines={DEFAULT_NUMBER_OF_LINES}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export { Card };
