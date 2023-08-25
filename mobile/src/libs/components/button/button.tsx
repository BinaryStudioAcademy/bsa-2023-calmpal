import React from 'react';
import { Pressable } from 'react-native';

import { Text } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  label: string;
  onPress: () => void;
  isDisabled?: boolean;
  isSurvey?: boolean;
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  isSurvey = false,
}) => {
  const handleOnPress = (): void => {
    onPress();
  };

  return (
    <Pressable
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled,
        isSurvey && styles.buttonSurvey,
      ]}
      onPress={handleOnPress}
      disabled={isDisabled}
    >
      <Text
        style={[
          styles.label,
          isDisabled && styles.labelDisabled,
          isSurvey && styles.labelSurvey,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export { Button };
