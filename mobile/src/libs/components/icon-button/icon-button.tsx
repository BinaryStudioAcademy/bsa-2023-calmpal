import React from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';

type IconButtonProperties = {
  onPress: () => void;
  iconSourceSvg: JSX.Element;
};

const IconButton: React.FC<IconButtonProperties> = ({
  onPress,
  iconSourceSvg,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      {iconSourceSvg}
    </TouchableOpacity>
  );
};

export { IconButton };
