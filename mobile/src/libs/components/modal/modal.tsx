import React from 'react';
import { Modal as RNModal } from 'react-native';

import {
  Button,
  Icon,
  Pressable,
  Text,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';

import { styles } from './styles';

type Properties = {
  isVisible: boolean;
  onClose: () => void;
  onDelete?: () => void;
  type?: 'Note' | 'Chat';
  children?: React.ReactNode;
};

const Modal: React.FC<Properties> = ({
  isVisible,
  onClose,
  onDelete,
  type,
  children,
}) => {
  return (
    <RNModal visible={isVisible} transparent animationType="none">
      <Pressable onPress={onClose} style={styles.background}>
        <View style={styles.modalContainer}>
          <Pressable>
            <View style={styles.modalView}>
              {onDelete ? (
                <>
                  <Text style={styles.modalTitle}>{`Delete ${type}?`}</Text>
                  <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                      <Button
                        label="Cancel"
                        onPress={onClose}
                        type="modal"
                        color={AppColor.GRAY_400}
                      />
                    </View>
                    <View style={styles.button}>
                      <Button
                        label="Delete"
                        onPress={onDelete}
                        type="modal"
                        color={AppColor.BLUE_300}
                      />
                    </View>
                  </View>
                </>
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
