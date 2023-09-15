import React from 'react';
import { Button, Modal as RNModal, Text, View } from 'react-native';

import { styles } from './styles';

const Modal: React.FC = () =>
  //   isVisible,
  //   onClose,
  //   onDelete,
  {
    return (
      <RNModal
        //   visible={isVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Note?</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                //   onPress={onClose}
              />
              <Button
                title="Delete"
                //   onPress={onDelete}
                color="red"
              />
            </View>
          </View>
        </View>
      </RNModal>
    );
  };

export { Modal };
