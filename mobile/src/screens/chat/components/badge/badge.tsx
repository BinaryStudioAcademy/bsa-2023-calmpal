import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

const Badge: React.FC = () => {
  return (
    <View style={styles.badge}>
      {/*12 is moked data*/}
      <Text style={styles.badgeText}>12</Text>
    </View>
  );
};

export { Badge };
