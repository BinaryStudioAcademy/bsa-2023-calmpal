import React from 'react';

import { Icon, Pressable } from '~/libs/components/components';
import { type IconName } from '~/libs/types/types';

import { styles } from './styles';

type Properties = {
  onPress: () => void;
  iconName: IconName;
  color: string;
};

const IconButton: React.FC<Properties> = ({ onPress, iconName, color }) => {
  return (
    <Pressable onPress={onPress} style={styles.iconButtonContainer}>
      <Icon name={iconName} color={color} />
    </Pressable>
  );
};

export { IconButton };
