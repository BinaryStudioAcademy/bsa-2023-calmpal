import React from 'react';

import { Pressable, Text, View } from '#libs/components/components';
import { useState } from '#libs/hooks/hooks';

import { styles } from './styles';

type ProfileCategoryProperties = {
  iconSourceSvg: JSX.Element;
  title: string;
};

const ProfileCategory: React.FC<ProfileCategoryProperties> = ({
  iconSourceSvg,
  title,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = (): void => {
    setIsPressed(!isPressed);
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[styles.container, isPressed ? styles.pressed : styles.default]}
      >
        <View style={styles.iconContainer}>{iconSourceSvg}</View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export { ProfileCategory };
