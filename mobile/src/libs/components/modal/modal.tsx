import React from 'react';
import { Modal as RNModal } from 'react-native';

import { Button, Text, View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const Modal: React.FC<Properties> = ({ isVisible, onClose, onDelete }) => {
  return (
    <RNModal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Note?</Text>
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
