import React from 'react';

import { Text, View } from '~/libs/components/components';

import { styles } from './styles';

type Properties = {
  count: number;
};

const Badge: React.FC<Properties> = ({ count }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

export { Badge };
