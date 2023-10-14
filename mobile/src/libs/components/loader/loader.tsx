import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AppColor } from '~/libs/enums/enums';

import { styles } from './styles';

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColor.BLUE_200} />
    </View>
  );
};

export { Loader };
