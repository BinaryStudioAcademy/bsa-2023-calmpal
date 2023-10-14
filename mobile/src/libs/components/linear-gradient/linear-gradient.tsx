import React from 'react';
import Gradient from 'react-native-linear-gradient';

import { AppColor } from '~/libs/enums/enums';

import { styles } from './styles';

type Properties = {
  children: React.ReactNode;
};

const LinearGradient: React.FC<Properties> = ({ children }) => {
  return (
    <Gradient
      colors={[AppColor.WHITE, AppColor.BLUE_100]}
      style={styles.linearGradient}
    >
      {children}
    </Gradient>
  );
};

export { LinearGradient };
