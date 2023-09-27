import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import {
  Icon,
  Image,
  Pressable,
  Swipeable,
  Text,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { type IconName } from '#libs/types/types';

import { DEFAULT_NUMBER_OF_LINES } from './libs/constants/constants';
import { styles } from './styles';

type Properties = {
  title: string;
  image?: ImageSourcePropType;
  iconName?: IconName;
  iconColor?: string;
  onPress: () => void;
  onDelete?: (id: number) => void;
  id?: number | string;
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
  const handleDelete = (): void => {
    onDelete?.(id as number);
  };

  const rightSwipeActions = (): React.ReactNode => {
    return (
      <Pressable style={styles.deleteContainer} onPress={handleDelete}>
        <Icon name="delete" color={AppColor.BLUE_300} />
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipeActions}>
      <Pressable onPress={onPress} style={styles.container}>
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
