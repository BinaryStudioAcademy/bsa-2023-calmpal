import Slider from '@react-native-community/slider';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Text, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { getFormattedTime } from '#libs/helpers/helpers';
import { usePlayerControls, usePlayerProgress } from '#libs/hooks/hooks';

import { TRACK_START_TIME } from './libs/constants';
import { darkStyles, lightStyles, styles } from './styles';

type Properties = {
  isPlaying: boolean;
};

const ProgressBar: React.FC<Properties> = ({ isPlaying }) => {
  const colorScheme = useColorScheme();
  const dayNigntStyles = colorScheme === 'dark' ? darkStyles : lightStyles;
  const [timeProgress, duration] = usePlayerProgress();

  const { handleSeek } = usePlayerControls({ isPlaying });

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.progress, dayNigntStyles.progress]}>
        {getFormattedTime(timeProgress)}
      </Text>
      <Text style={[styles.duration, dayNigntStyles.duration]}>
        {getFormattedTime(duration)}
      </Text>
      <Slider
        minimumValue={TRACK_START_TIME}
        maximumValue={duration}
        minimumTrackTintColor={AppColor.GRAY_400}
        maximumTrackTintColor={AppColor.GRAY_300}
        thumbTintColor="transparent"
        value={timeProgress}
        onValueChange={handleSeek}
      />
    </View>
  );
};

export { ProgressBar };
