import React from 'react';

import { Pressable, Text } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';

import { styles } from './styles';

type Properties = {
  label?: string;
  onPress: () => void;
  isDisabled?: boolean;
  type?: 'solid' | 'outlined';
  color?: string;
  styles?: { height?: number; borderRadius?: number };
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
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
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
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
    </Pressable>
  );
};

export { Button };
