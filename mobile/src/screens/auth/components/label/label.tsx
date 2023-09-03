import React from 'react';

import Logo from '#assets/img/logo.png';
import { Image } from '#libs/components/components';

import { styles } from './styles';

const Label: React.FC = () => {
  return <Image source={Logo} style={styles.label} />;
};

export { Label };
