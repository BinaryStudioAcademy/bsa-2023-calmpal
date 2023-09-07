import React from 'react';
import { Pressable } from 'react-native';

import { type IconName } from '#libs/types/types';

// import { styles } from './styles';

type Properties = {
  onPress: () => void;
  IconName: IconName;
};

const IconButton: React.FC<Properties> = ({
  onPress,

  IconName,
}) => {
  return <Pressable onPress={onPress}>{IconName}</Pressable>;
};

export { IconButton };
