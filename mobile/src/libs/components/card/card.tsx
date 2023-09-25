import React from 'react';
import { type ImageSourcePropType } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import {
  Icon,
  Image,
  Pressable,
  Text,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { type IconName } from '#libs/types/types';

import { DEFAULT_NUMBER_OF_LINES } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title: string;
  image?: ImageSourcePropType;
  iconName?: IconName;
  iconColor?: string;
  onPress: (title: string) => void;
  onDelete?: (id: number) => void;
  id?: number;
};

const Card: React.FC<Properties> = ({
  title,
  image = imagePlaceholder,
  iconName,
  iconColor,
  onPress,
  onDelete,
  id,
}) => {
  const handlePress = (): void => {
    onPress(title);
  };

  const handleDelete = (): void => {
    if (onDelete && id) {
      onDelete(id);
    }
  };

  const renderRightSwipeActions = (): React.ReactNode => {
    return (
      <Pressable style={styles.deleteContainer} onPress={handleDelete}>
        <Icon name="delete" color={AppColor.BLUE_300} />
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightSwipeActions}>
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
    </Swipeable>
  );
};

export { Card };
