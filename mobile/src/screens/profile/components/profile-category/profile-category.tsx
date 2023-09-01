import React from 'react';

import { Text, View } from '#libs/components/components';

import { styles } from './styles';

type ProfileCategoryProperties = {
  iconSourceSvg: JSX.Element;
  title: string;
};

const ProfileCategory: React.FC<ProfileCategoryProperties> = ({
  iconSourceSvg,
  title,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconContainer}>{iconSourceSvg}</View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export { ProfileCategory };
