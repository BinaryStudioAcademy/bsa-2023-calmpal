import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { AppColor } from '#libs/enums/enums';

import { styles } from './styles';

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>
        <ActivityIndicator size="large" color={AppColor.BLUE_100} />;
      </Text>
    </View>
  );
};

export { Loader };
