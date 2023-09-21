import React from 'react';

import {
  Button,
  Pressable,
  ReactModal,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useState } from '#libs/hooks/hooks';

import { DURATION_UNIT, MEDITATION_DURATION } from './libs/constants';
import { styles } from './styles';

type Properties = {
  onClose: () => void;
  setDuration: (duration: number) => void;
  startMeditation: () => void;
};

const SetTimerModal: React.FC<Properties> = ({
  onClose,
  setDuration,
  startMeditation,
}) => {
  const [isPressed, setIsPressed] = useState('');

  const handleStartMeditation = (): void => {
    onClose();
    startMeditation();
  };

  return (
    <ReactModal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity onPress={onClose} style={styles.container}>
        <Pressable style={styles.modal}>
          <Text style={styles.title}>Choose Your Duration</Text>
          <View style={styles.durations}>
            {Object.keys(MEDITATION_DURATION).map((duration) => {
              return (
                <TouchableOpacity
                  key={duration}
                  style={[
                    styles.durationItem,
                    isPressed === duration && styles.activeDuration,
                  ]}
                  onPress={(): void => {
                    setIsPressed(duration);
                    setDuration(
                      MEDITATION_DURATION[
                        duration as keyof typeof MEDITATION_DURATION
                      ],
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.duration,
                      isPressed === duration && styles.activeText,
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
                      isPressed === duration && styles.activeText,
                    ]}
                  >
                    {DURATION_UNIT.MINUTES}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Button
            label="Start Session"
            onPress={handleStartMeditation}
            color={AppColor.BLUE_300}
            type="solid"
            styles={styles.button}
          />
        </Pressable>
      </TouchableOpacity>
    </ReactModal>
  );
};

export { SetTimerModal };
