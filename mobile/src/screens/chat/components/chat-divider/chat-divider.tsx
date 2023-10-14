import React from 'react';

import { Text, View } from '~/libs/components/components';
import { getRelativeDate } from '~/libs/helpers/helpers';

import { styles } from './styles';

type Properties = {
  date: Date;
};

const ChatDivider: React.FC<Properties> = ({ date }) => {
  const relativeDate = getRelativeDate(date);

  return (
    <View style={styles.container}>
      <View style={styles.beforeElement} />
      <Text style={styles.date}>{relativeDate}</Text>
      <View style={styles.afterElement} />
    </View>
  );
};

export { ChatDivider };
