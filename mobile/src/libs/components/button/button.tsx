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
        style === 'solid' ? styles.button : styles.buttonSurvey,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={handleOnPress}
      disabled={isDisabled}
    >
      <Text
        style={[
          style === 'solid' ? styles.label : styles.labelSurvey,
          isDisabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export { Button };
