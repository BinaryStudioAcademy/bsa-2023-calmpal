import React from 'react';

import { Icon, Pressable, Text, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useEffect, useState } from '#libs/hooks/hooks';
import { type IconName } from '#libs/types/types';

import { PRESS_TIMEOUT } from './libs/constants';
import { styles } from './styles';

type Properties = {
  label?: string;
  onPress: () => void;
  isDisabled?: boolean;
  type?: 'solid' | 'outlined' | 'transparent';
  isRounded?: boolean;
  iconName?: IconName;
  isVisuallyCentered?: boolean;
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
  isRounded,
  iconName,
  isVisuallyCentered,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  let color;
  if (isPressed) {
    color = AppColor.BLUE_200;
  } else {
    color = isRounded ? AppColor.BLUE_200 : AppColor.GRAY_400;
  }

  const handlePress = (): void => {
    setIsPressed(true);
    onPress();
  };

  useEffect(() => {
    if (isPressed) {
      setTimeout(() => {
        setIsPressed(false);
      }, PRESS_TIMEOUT);
    }
  }, [isPressed]);

  return (
    <Pressable
      style={[
        styles.button,
        type === 'solid' && styles.buttonSolid,
        type === 'outlined' && styles.buttonOutlined,
        type === 'transparent' && styles.buttonTransparent,
        isRounded && styles.buttonRounded,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      {iconName ? (
        <View style={isVisuallyCentered && styles.visuallyCenteredButton}>
          <Icon name={iconName} color={color} />
        </View>
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
