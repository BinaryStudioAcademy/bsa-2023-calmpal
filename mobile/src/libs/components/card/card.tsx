import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import {
  Icon,
  Image,
  Pressable,
  Text,
  View,
} from '#libs/components/components';
import { type IconName } from '#libs/types/types';

import { DEFAULT_NUMBER_OF_LINES } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title: string;
  id?: string;
  image?: ImageSourcePropType;
  iconName?: IconName;
  iconColor?: string;
  onPress: (title: string, id?: string) => void;
};

const Card: React.FC<Properties> = ({
  title,
  id = '',
  image = imagePlaceholder,
  iconName,
  iconColor,
  onPress,
}) => {
  const handlePress = (): void => {
    onPress(title, id);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {iconName && iconColor ? (
        <View style={styles.iconContainer}>
          <Icon name={iconName} color={iconColor} />
        </View>
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
