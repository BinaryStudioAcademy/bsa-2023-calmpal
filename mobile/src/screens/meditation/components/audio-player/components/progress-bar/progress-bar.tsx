import React from 'react';

import { Text, View } from '#libs/components/components';
import { getFormattedTime } from '#libs/helpers/helpers';

import { styles } from './styles';

type Properties = {
  timeProgress: number;
  duration: number;
};

const ProgressBar: React.FC<Properties> = ({ timeProgress, duration }) => {
  return (
    <View>
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>{getFormattedTime(timeProgress)}</Text>
        <Text style={styles.time}>{getFormattedTime(duration)}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={styles.innerProgressBar} />
      </View>
    </View>
  );
};

export { ProgressBar };
