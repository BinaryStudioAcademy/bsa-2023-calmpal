import React from 'react';

import { Icon, Pressable, Text } from '#libs/components/components';
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
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
  isRounded,
  iconName,
}) => {
  return (
    <Pressable
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
    >
      {iconName ? (
        <Icon
          name={iconName}
          color={isRounded ? AppColor.BLUE_200 : AppColor.GRAY_400}
        />
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
    </Pressable>
  );
};

export { Button };
