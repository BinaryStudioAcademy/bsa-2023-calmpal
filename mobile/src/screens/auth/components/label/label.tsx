import React from 'react';

import Logo from '~/assets/img/logo.svg';
import { AppColor } from '~/libs/enums/enums';

import { styles } from './styles';

const Label: React.FC = () => {
  return <Logo width={175} style={styles.label} color={AppColor.WHITE} />;
};

export { Label };
