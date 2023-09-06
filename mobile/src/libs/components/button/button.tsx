import React from 'react';
import { Pressable } from 'react-native';

import { Text } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  label: string;
  onPress: () => void;
  isDisabled?: boolean;
  type?: 'solid' | 'outlined';
  color?: string;
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
  color = '',
}) => {
  const handleOnPress = (): void => {
    onPress();
  };

  let dynamicStyles = {};

  if (color) {
    dynamicStyles = {
      backgroundColor: type === 'solid' ? color : 'transparent',
      borderColor: type === 'outlined' ? color : 'transparent',
    };
  }

  return (
    <Pressable
      style={[
        styles.button,
        type === 'solid' && styles.buttonSolid,
        type === 'outlined' && styles.buttonOutlined,
        isDisabled && styles.buttonDisabled,
        dynamicStyles,
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
