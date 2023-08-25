import { type ReactNode } from 'react';
import React from 'react';
import { Text, View } from 'react-native';
import { type StyleProp, type ViewStyle } from 'react-native';

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
