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
    <RNModal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{`Delete ${type}?`}</Text>
          <View style={styles.buttonContainer}>
            <Button label="Cancel" onPress={onClose} />
            <Button label="Delete" onPress={onDelete} />
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export { Modal };
