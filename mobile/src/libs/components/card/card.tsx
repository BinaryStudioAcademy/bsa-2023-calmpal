import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import { Image, Pressable, Text, View } from '#libs/components/components';

import { DEFAULT_NUMBER_OF_LINES } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title: string;
  image?: ImageSourcePropType;
  iconSourceSvg?: JSX.Element;
  onPress: (title: string) => void;
};

const Card: React.FC<Properties> = ({
  title,
  image = imagePlaceholder,
  iconSourceSvg,
  onPress,
}) => {
  const handlePress = (): void => {
    onPress(title);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {iconSourceSvg ? (
        <View style={styles.iconContainer}>{iconSourceSvg}</View>
      ) : (
        <Image source={image} style={styles.image} />
      )}
      <Text
        style={styles.title}
        numberOfLines={DEFAULT_NUMBER_OF_LINES}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </Pressable>
  );
};

export { Card };
