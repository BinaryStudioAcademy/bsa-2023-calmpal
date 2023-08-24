import React from 'react';
import { Pressable } from 'react-native';

import { Text } from '#libs/components/components';
import { useState } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties = {
  label: string;
  onPress: () => void;
  isDisabled?: boolean;
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleOnPress = (): void => {
    if (isDisabled) {
      return;
    }
    setIsPressed(true);
    onPress();
  };

  return (
    <Pressable
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled,
        isPressed && styles.buttonPressed,
      ]}
      onPress={handleOnPress}
    >
      <Text style={[styles.label, isDisabled && styles.labelDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
};

export { Button };
