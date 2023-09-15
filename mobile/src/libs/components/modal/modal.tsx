import React from 'react';
import { Modal as RNModal } from 'react-native';

import { Button, Text, View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  type?: 'Note';
};

const Modal: React.FC<Properties> = ({
  isVisible,
  onClose,
  onDelete,
  type,
}) => {
  return (
    <RNModal visible={isVisible} transparent={true} animationType="none">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{`Delete ${type}?`}</Text>
          <View style={styles.buttonsContainer}>
            <Button label="Cancel" onPress={onClose} type="modal-cancel" />
            <Button label="Delete" onPress={onDelete} type="modal-delete" />
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export { Modal };
