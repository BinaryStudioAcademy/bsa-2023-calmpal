import { type ReactNode } from 'react';
import React from 'react';
import { Text, View } from 'react-native';
import { type StyleProp, type ViewStyle } from 'react-native';

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
