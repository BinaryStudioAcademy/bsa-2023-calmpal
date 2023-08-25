import React, { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Text, View } from '#libs/components/components';

const HomeHeader = ({
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
    </View>
  );
};

export { HomeHeader };
