import React from 'react';

import { Text, TouchableOpacity } from '#libs/components/components';
import { getFormattedTime } from '#libs/helpers/helpers';
import { useCallback } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties = {
  isActive: boolean;
  duration: number;
  unit: string;
  onSetDuration: (duration: number) => void;
  onChange: (duration: number) => void;
};

const TimerButton: React.FC<Properties> = ({
  isActive,
  duration,
  unit,
  onSetDuration,
  onChange,
}) => {
  const handleChange = useCallback(() => {
    onSetDuration(duration);
    onChange(duration);
  }, [onChange, duration, onSetDuration]);

  return (
    <TouchableOpacity
      key={duration}
      style={[styles.durationItem, isActive && styles.activeDuration]}
      onPress={handleChange}
    >
      <Text style={[styles.duration, isActive && styles.activeText]}>
        {getFormattedTime(duration, false)}
      </Text>
      <Text style={[styles.durationUnit, isActive && styles.activeText]}>
        {unit}
      </Text>
    </TouchableOpacity>
  );
};

export { TimerButton };
