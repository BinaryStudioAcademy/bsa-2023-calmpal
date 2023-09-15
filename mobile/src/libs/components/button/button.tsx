import React from 'react';

import { Icon, Pressable, Text } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { type IconName } from '#libs/types/types';

import { styles } from './styles';

type Properties = {
  label?: string;
  onPress: () => void;
  isDisabled?: boolean;
  type?: 'solid' | 'outlined' | 'transparent';
  isRounded?: boolean;
  iconName?: IconName;
  color?: string;
  styles?: { height?: number; borderRadius?: number };
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
  isRounded,
  iconName,
  color = AppColor.GRAY_500,
  styles: buttonStyles,
}) => {
  const isCustomColor = Boolean(color);

  return (
    <Pressable
      style={[
        styles.button,
        type === 'solid' && styles.buttonSolid,
        type === 'outlined' && styles.buttonOutlined,
        isCustomColor && { backgroundColor: color },
        buttonStyles,
        type === 'transparent' && styles.buttonTransparent,
        isRounded && styles.buttonRounded,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {iconName ? (
        <Icon
          name={iconName}
          color={isRounded ? AppColor.BLUE_200 : AppColor.GRAY_400}
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
