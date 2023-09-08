import React from 'react';

import { Icon, TouchableOpacity } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { type IconName } from '#libs/types/types';

import { styles } from './styles';

type Properties = {
  onPress: () => void;
  iconName: IconName;
  isRounded?: boolean;
};

const Button: React.FC<Properties> = ({
  onPress,
  iconName,
  isRounded = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={isRounded && styles.rounded}>
      <Icon
        color={isRounded ? AppColor.BLUE_200 : AppColor.GRAY_400}
        name={iconName}
      />
    </TouchableOpacity>
  );
};

export { Button };
