import React from 'react';
import { Modal as RNModal } from 'react-native';

import { Button, Pressable, Text, View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  isVisible: boolean;
  onClose: () => void;
  onDelete?: () => void;
  type?: 'Note';
  children?: React.ReactNode;
};

const Modal: React.FC<Properties> = ({
  children,
  isVisible,
  onClose,
  onDelete,
  type,
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
                    <Button
                      label="Cancel"
                      onPress={onClose}
                      type="modal-cancel"
                    />
                    <Button
                      label="Delete"
                      onPress={onDelete}
                      type="modal-delete"
                    />
                  </View>
                </>
              ) : (
                <>
                  <Pressable onPress={onClose} style={styles.closeButton}>
                    {/* add icon here */}
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
