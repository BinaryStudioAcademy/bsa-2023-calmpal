import React from 'react';
import {
  //   View,
  //   Text,
  Modal as RNModal,
  //   Button,
  //   StyleSheet,
} from 'react-native';

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
        {/* <View style={styles.modalContainer}>
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
      </View> */}
      </RNModal>
    );
  };

export { Modal };
