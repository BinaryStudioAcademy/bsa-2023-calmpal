import React from 'react';

import { Icon, Pressable, Text } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { type IconName } from '#libs/types/types';

import { styles } from './styles';

type Properties = {
  label?: string;
  onPress: () => void;
  isDisabled?: boolean;
  type?: 'solid' | 'outlined' | 'rounded' | 'transparent';
  iconName?: IconName;
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
  iconName,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        type === 'solid' && styles.buttonSolid,
        type === 'outlined' && styles.buttonOutlined,
        type === 'rounded' && styles.buttonRounded,
        type === 'transparent' && styles.buttonTransparent,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {iconName ? (
        <Icon
          name={iconName}
          color={type === 'rounded' ? AppColor.BLUE_200 : AppColor.GRAY_400}
        />
      ) : (
        <Text
          style={[
            styles.label,
            type === 'solid' && styles.labelSolid,
            type === 'outlined' && styles.labelOutlined,
            isDisabled && styles.labelDisabled,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export { Button };
