import React, { type ReactNode } from 'react';
import { Pressable } from 'react-native';

import { Text } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  label?: string;
  onPress: () => void;
  iconSourceSvg?: ReactNode;
  isDisabled?: boolean;
  type?: 'solid' | 'outlined';
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
  iconSourceSvg,
}) => {
  const handleOnPress = (): void => {
    onPress();
  };

  return iconSourceSvg ? (
    <Pressable onPress={handleOnPress} style={styles.iconButtonContainer}>
      {iconSourceSvg}
    </Pressable>
  ) : (
    <Pressable
      style={[
        styles.button,
        type === 'solid' && styles.buttonSolid,
        type === 'outlined' && styles.buttonOutlined,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={handleOnPress}
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
