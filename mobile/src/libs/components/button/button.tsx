import React from 'react';

import {
  Icon,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { type IconName } from '#libs/types/types';

import { styles } from './styles';

type Properties = {
  label?: string;
  onPress: () => void;
  isDisabled?: boolean;
  type?: 'solid' | 'outlined' | 'transparent' | 'modal';
  isRounded?: boolean;
  iconName?: IconName;
  isVisuallyCentered?: boolean;
  color?: string;
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
  isRounded,
  iconName,
  isVisuallyCentered,
  color,
}) => {
  const renderIcon = (): JSX.Element => {
    return (
      <View
        style={[
          isVisuallyCentered && styles.visuallyCenteredButton,
          isRounded && styles.buttonRounded,
        ]}
      >
        <Icon name={iconName as IconName} color={color ?? AppColor.GRAY_400} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'solid' && styles.buttonSolid,
        type === 'outlined' && styles.buttonOutlined,
        type === 'transparent' && styles.buttonTransparent,
        type === 'modal' && [styles.buttonModal, { backgroundColor: color }],
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.5}
    >
      {iconName && renderIcon()}
      <Text
        style={[
          { color: color },
          styles.label,
          type === 'solid' && styles.labelSolid,
          type === 'outlined' && styles.labelOutlined,
          type === 'modal' && styles.labelModal,
          isDisabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };
