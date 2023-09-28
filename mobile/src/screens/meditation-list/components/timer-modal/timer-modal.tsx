import { type Dispatch, type SetStateAction } from 'react';
import React from 'react';
import { Modal as RNModal } from 'react-native';

import {
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';
import { useAppForm, useFormController } from '#libs/hooks/hooks';

import { TimerButton } from './components/components';
import {
  DEFAULT_DURATION,
  DURATION_UNIT,
  MEDITATION_DURATION,
} from './libs/constants';
import { styles } from './styles';

type DurationKey = keyof typeof MEDITATION_DURATION;

type Properties = {
  onClose: () => void;
  setDuration: Dispatch<SetStateAction<number>>;
  startMeditation: () => void;
};

const TimerModal: React.FC<Properties> = ({
  onClose,
  setDuration,
  startMeditation,
}) => {
  const { control } = useAppForm({
    defaultValues: { meditationDuration: DEFAULT_DURATION },
  });

  const {
    field: { onChange, value },
  } = useFormController({
    name: 'meditationDuration',
    control,
  });

  const handleStartMeditation = (): void => {
    onClose();
    startMeditation();
  };

  return (
    <RNModal
      animationType="none"
      transparent
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity onPress={onClose} style={styles.container}>
        <Pressable style={styles.modal}>
          <Text style={styles.title}>Choose Your Duration</Text>
          <View style={styles.durations}>
            {Object.keys(MEDITATION_DURATION).map((durationKey) => {
              const duration = MEDITATION_DURATION[durationKey as DurationKey];

              return (
                <TimerButton
                  key={duration}
                  isActive={value === duration}
                  onChange={onChange}
                  setDuration={setDuration}
                  duration={duration}
                  unit={DURATION_UNIT.MINUTES}
                />
              );
            })}
          </View>

          <Button
            label="Start with selected duration"
            onPress={handleStartMeditation}
            type="timer"
          />
        </Pressable>
      </TouchableOpacity>
    </RNModal>
  );
};

export { TimerModal };
