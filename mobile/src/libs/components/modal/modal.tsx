import React from 'react';

import {
  Button,
  ReactModal,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useState } from '#libs/hooks/hooks';

import { MEDITATION_DURATION } from './libs/constants';
import { styles } from './styles';

const Modal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <ReactModal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={(): void => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.title}>Choose your duration</Text>
            <View style={styles.durations}>
              {Object.keys(MEDITATION_DURATION).map((duration) => {
                return (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationItem,
                      duration === 'LONG' && styles.active,
                    ]}
                  >
                    <Text
                      style={[
                        styles.duration,
                        duration === 'LONG' && styles.activeText,
                      ]}
                    >
                      {
                        MEDITATION_DURATION[
                          duration as keyof typeof MEDITATION_DURATION
                        ]
                      }
                    </Text>
                    <Text
                      style={[
                        styles.durationUnit,
                        duration === 'LONG' && styles.activeText,
                      ]}
                    >
                      min
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Button
              label="Start Session"
              onPress={(): void => {
                setIsModalVisible(!isModalVisible);
              }}
              color={AppColor.BLUE_300}
            />
          </View>
        </View>
      </ReactModal>
    </View>
  );
};

export { Modal };
