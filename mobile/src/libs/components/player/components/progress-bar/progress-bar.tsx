import Slider from '@react-native-community/slider';
import React from 'react';

import { Text, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { getFormattedTime } from '#libs/helpers/helpers';
import { usePlayerControls, usePlayerProgress } from '#libs/hooks/hooks';

import { TRACK_START_TIME } from './libs/constants';
import { styles } from './styles';

type Properties = {
  isPlaying: boolean;
};

const ProgressBar: React.FC<Properties> = ({ isPlaying }) => {
  const [timeProgress, duration] = usePlayerProgress();

  const { handleSeek } = usePlayerControls({ isPlaying });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.progress}>
        {getFormattedTime(timeProgress, false)}
      </Text>
      <Text style={styles.duration}>{getFormattedTime(duration, false)}</Text>
      <Slider
        minimumValue={TRACK_START_TIME}
        maximumValue={duration}
        minimumTrackTintColor={AppColor.GRAY_400}
        maximumTrackTintColor={AppColor.GRAY_300}
        thumbTintColor={AppColor.GRAY_400}
        value={timeProgress}
        onValueChange={handleSeek}
      />
    </View>
  );
};

export { ProgressBar };
