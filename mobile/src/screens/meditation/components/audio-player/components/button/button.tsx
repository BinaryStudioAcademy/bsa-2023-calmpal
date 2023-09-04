import React from 'react';
import { type SvgProps } from 'react-native-svg';

import { TouchableOpacity } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';

import { styles } from './styles';

type Properties = {
  onPress: () => void;
  Icon: React.FC<SvgProps>;
  isRounded?: boolean;
};

const Button: React.FC<Properties> = ({ onPress, Icon, isRounded = false }) => {
  return (
    <TouchableOpacity onPress={onPress} style={isRounded && styles.rounded}>
      <Icon color={isRounded ? AppColor.BLUE_200 : AppColor.GRAY_400} />
    </TouchableOpacity>
  );
};

export { Button };
