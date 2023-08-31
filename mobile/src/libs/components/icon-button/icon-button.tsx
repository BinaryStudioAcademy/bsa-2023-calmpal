import React from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';

type IconButtonProperties = {
  onPress: () => void;
  icon: React.ReactNode;
};

const IconButton: React.FC<IconButtonProperties> = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      {icon}
    </TouchableOpacity>
  );
};

export { IconButton };
