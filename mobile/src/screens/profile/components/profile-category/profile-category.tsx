import React from 'react';

import { Pressable, Text, View } from '#libs/components/components';

import { styles } from './styles';

type ProfileCategoryProperties = {
  iconSourceSvg: JSX.Element;
  title: string;
  onPress: () => void;
};

const ProfileCategory: React.FC<ProfileCategoryProperties> = ({
  iconSourceSvg,
  title,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{iconSourceSvg}</View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export { ProfileCategory };
