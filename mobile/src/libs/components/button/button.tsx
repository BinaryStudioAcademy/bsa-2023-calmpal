import React from 'react';
import { Pressable } from 'react-native';

import { Text } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  label: string;
  onPress: () => void;
  isDisabled?: boolean;
  style?: 'solid' | 'outlined';
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  style = 'solid',
}) => {
  const handleOnPress = (): void => {
    onPress();
  };

  return (
    <Pressable
      style={[
        styles.button,
        style === 'solid' && styles.buttonSolid,
        style === 'outlined' && styles.buttonOutlined,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={handleOnPress}
      disabled={isDisabled}
    >
      <Text
        style={[
          styles.label,
          style === 'solid' && styles.labelSolid,
          style === 'outlined' && styles.labelOutlined,
          isDisabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export { Button };
