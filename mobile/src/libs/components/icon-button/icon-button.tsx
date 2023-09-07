import React, { type ReactNode } from 'react';
import { Pressable } from 'react-native';

// import { styles } from './styles';

type Properties = {
  onPress: () => void;
  iconSourceSvg?: ReactNode;
};

const IconButton: React.FC<Properties> = ({
  onPress,

  iconSourceSvg,
}) => {
  return <Pressable onPress={onPress}>{iconSourceSvg}</Pressable>;
};

export { IconButton };
