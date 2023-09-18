import React from 'react';
import { Modal } from 'react-native';

import { Pressable, View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  children: React.ReactNode;
  isVisible: boolean;
  closeModal: () => void;
};

const Popup: React.FC<Properties> = ({ children, isVisible, closeModal }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable onPress={closeModal} style={styles.background}>
          <View style={styles.centeredView}>
            <Pressable>
              <View style={styles.modalView}>
                <Pressable onPress={closeModal} style={styles.closeButton}>
                  {/* add icon here */}
                </Pressable>
                {children}
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export { Popup };
