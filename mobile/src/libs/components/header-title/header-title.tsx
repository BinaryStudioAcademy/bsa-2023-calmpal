import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type Properties = {
  isBadge?: boolean;
  title: string;
};

const HeaderTitle: React.FC<Properties> = ({ isBadge, title }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {isBadge ? (
        <View style={styles.badge}>
          {/*12 is moked data*/}
          <Text style={styles.badgeText}>12</Text>
        </View>
      ) : null}
    </View>
  );
};

export { HeaderTitle };
