import React from 'react';

import { Text, View } from '#libs/components/components';

import { styles } from './styles';

const ChatDivider: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.beforeElement} />
      <Text style={styles.date}>today</Text>
      <View style={styles.afterElement} />
    </View>
  );
};

export { ChatDivider };
