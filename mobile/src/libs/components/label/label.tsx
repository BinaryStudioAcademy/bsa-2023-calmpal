import React from 'react';

import { Text, View } from '#libs/components/components';

import { styles } from './styles';

const Label: React.FC = () => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>CalmPal</Text>
    </View>
  );
};

export { Label };
