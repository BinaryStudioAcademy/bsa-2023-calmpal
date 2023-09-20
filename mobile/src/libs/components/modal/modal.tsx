import React from 'react';
import { Modal as RNModal } from 'react-native';

import { Icon, Pressable, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';

import { styles } from './styles';

type Properties = {
  isVisible: boolean;
  onClose: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
};

const Modal: React.FC<Properties> = ({
  children,
  isVisible,
  onClose,
  onDelete,
}) => {
  return (
    <RNModal visible={isVisible} transparent={true} animationType="none">
      <Pressable onPress={onClose} style={styles.background}>
        <View style={styles.modalContainer}>
          <Pressable>
            <View style={styles.modalView}>
              {onDelete ? (
                <></>
              ) : (
                <>
                  <Pressable onPress={onClose} style={styles.closeButton}>
                    <Icon name="close" color={AppColor.GRAY_500} />
                  </Pressable>
                  {children}
                </>
              )}
            </View>
          </Pressable>
        </View>
      </Pressable>
    </RNModal>
  );
};
export { Modal };
