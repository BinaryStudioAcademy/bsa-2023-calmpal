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
  image?: ImageSourcePropType;
  iconName?: IconName;
  iconColor?: string;
  onPress?: () => void;
  handlePassTitle?: (title: string) => void;
  handlePassId?: (id: number) => void;
  noteId?: number;
};

const Card: React.FC<Properties> = ({
  title,
  image = imagePlaceholder,
  iconName,
  iconColor,
  onPress,
  handlePassTitle,
  handlePassId,
  noteId,
}) => {
  const handlePress = (): void => {
    if (handlePassTitle) {
      handlePassTitle(title);
    } else if (handlePassId && noteId) {
      handlePassId(noteId);
    } else if (onPress) {
      onPress();
    }
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
