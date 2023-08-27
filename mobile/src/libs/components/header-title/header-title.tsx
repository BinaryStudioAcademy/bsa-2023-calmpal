import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type Properties = {
  hasBadge?: boolean;
  title: string;
};

const HeaderTitle: React.FC<Properties> = ({ hasBadge = false, title }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {hasBadge ? (
        <View style={styles.badge}>
          {/*12 is moked data*/}
          <Text style={styles.badgeText}>12</Text>
        </View>
      ) : null}
    </View>
  );
};

export { HeaderTitle };
