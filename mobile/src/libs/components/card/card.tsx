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
  iconRight?: IconName;
  onIconPress?: () => void;
  id?: number;
};

const rowReferences = new Map();

const Card: React.FC<Properties> = ({
  title,
  image = imagePlaceholder,
  iconName,
  iconColor,
  onPress,
  iconRight,
  onIconPress,
  id,
}) => {
  const renderRightSwipeActions = (): React.ReactNode => {
    return (
      Boolean(iconRight) && (
        <Pressable style={styles.deleteContainer} onPress={onIconPress}>
          <Icon name={iconRight as IconName} color={AppColor.BLUE_300} />
        </Pressable>
      )
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightSwipeActions}
      key={id}
      ref={(reference: Swipeable | null): void => {
        if (reference && !rowReferences.get(id)) {
          rowReferences.set(id, reference);
        }
      }}
      onSwipeableWillOpen={(): void => {
        [...rowReferences.entries()].forEach(([key, reference]) => {
          if (key !== id && reference) {
            (reference as Swipeable).close();
          }
        });
      }}
    >
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
