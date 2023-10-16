import React, { type Dispatch, type SetStateAction } from 'react';
import { Modal as RNModal } from 'react-native';

import {
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from '~/libs/components/components';
import { useAppForm, useFormController } from '~/libs/hooks/hooks';
import {
  DURATION_UNIT,
  MEDITATION_DURATION,
} from '~/libs/packages/player/player';

import { TimerButton } from './components/components';
import { DEFAULT_DURATION_VALUE } from './libs/constants/constants';
import { styles } from './styles';

type DurationKey = keyof typeof MEDITATION_DURATION;

type Properties = {
  onClose: () => void;
  onSetDuration: Dispatch<SetStateAction<number>>;
  onStartMeditation: () => void;
};

const TimerModal: React.FC<Properties> = ({
  onClose,
  onSetDuration,
  onStartMeditation,
}) => {
  const { control } = useAppForm({
    defaultValues: DEFAULT_DURATION_VALUE,
  });

  const {
    field: { onChange, value },
  } = useFormController({
    name: 'meditationDuration',
    control,
  });
  const hasValue = Boolean(value);

  const handleStartMeditation = (): void => {
    onClose();
    onStartMeditation();
  };

  return (
    <RNModal animationType="none" transparent visible onRequestClose={onClose}>
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
                  onSetDuration={onSetDuration}
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
            isDisabled={!hasValue}
          />
        </Pressable>
      </TouchableOpacity>
    </RNModal>
  );
};

export { TimerModal };
