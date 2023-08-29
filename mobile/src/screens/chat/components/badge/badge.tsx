import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type Properties = {
  count: number;
};

const Badge: React.FC<Properties> = ({ count }) => {
  return (
    <View style={styles.badge}>
      {/*12 is moked data*/}
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

export { Badge };
