import React from 'react';

import { Pressable } from '#libs/components/components';
import { type IconName } from '#libs/types/types';

import { styles } from './styles';

type Properties = {
  onPress: () => void;
  IconName: IconName;
};

const IconButton: React.FC<Properties> = ({
  onPress,

  IconName,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.iconButtonContainer}>
      {IconName}
    </Pressable>
  );
};

export { IconButton };
