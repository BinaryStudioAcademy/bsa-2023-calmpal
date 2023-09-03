import React from 'react';

import { TouchableOpacity } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  onPress: () => void;
  iconSourceSvg: JSX.Element;
};

const IconButton: React.FC<Properties> = ({ onPress, iconSourceSvg }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      {iconSourceSvg}
    </TouchableOpacity>
  );
};

export { IconButton };
