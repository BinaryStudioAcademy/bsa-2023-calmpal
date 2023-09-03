import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AppColor } from '#libs/enums/enums';

import { styles } from './styles';

type Properties = {
  isVisible: boolean;
};

const Loader: React.FC<Properties> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColor.BLUE_200} />
    </View>
  );
};

export { Loader };
