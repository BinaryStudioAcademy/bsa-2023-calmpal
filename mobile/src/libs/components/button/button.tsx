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
  type?: 'solid' | 'outlined' | 'transparent' | 'modal-cancel' | 'modal-delete';
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
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'solid' && styles.buttonSolid,
        type === 'outlined' && styles.buttonOutlined,
        type === 'transparent' && styles.buttonTransparent,
        type === 'modal-cancel' && styles.buttonModalCancel,
        type === 'modal-delete' && styles.buttonModalDelete,
        isRounded && styles.buttonRounded,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.5}
    >
      {iconName ? (
        <View style={isVisuallyCentered && styles.visuallyCenteredButton}>
          <Icon
            name={iconName}
            color={isRounded ? AppColor.BLUE_200 : AppColor.GRAY_400}
          />
        </View>
      ) : (
        <Text
          style={[
            styles.label,
            type === 'solid' && styles.labelSolid,
            type === 'outlined' && styles.labelOutlined,
            type === 'modal-cancel' && styles.labelModalCancel,
            type === 'modal-delete' && styles.labelModalDelete,
            isDisabled && styles.labelDisabled,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export { Button };
