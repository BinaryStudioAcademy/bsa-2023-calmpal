import React, { type ReactNode } from 'react';
import { type StyleProp, Text, View, type ViewStyle } from 'react-native';

import { styles } from './styles';

const ChatHeader = ({
  title,
  headerStyle,
  titleStyle,
}: {
  title: string;
  headerStyle: StyleProp<ViewStyle>;
  titleStyle: StyleProp<ViewStyle>;
}): ReactNode => {
  return (
    <View style={headerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <View style={styles.badge}>
        {/*12 is moked data*/}
        <Text style={styles.badgeText}>12</Text>
      </View>
    </View>
  );
};

export { ChatHeader };
