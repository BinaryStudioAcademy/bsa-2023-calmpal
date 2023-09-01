import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import LogoImage from '#assets/img/logo.png';
import { Image } from '#libs/components/components';

import { styles } from './styles';

const Label: React.FC = () => {
  return (
    <Image source={LogoImage as ImageSourcePropType} style={styles.label} />
  );
};

export { Label };
