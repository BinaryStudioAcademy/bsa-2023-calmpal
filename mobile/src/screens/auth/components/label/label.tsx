import React from 'react';

import LogoImage from '#assets/img/logo.png';
import { Image } from '#libs/components/components';

import { styles } from './styles';

const Label: React.FC = () => {
  return <Image source={LogoImage} style={styles.label} />;
};

export { Label };
