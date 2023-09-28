import Slider from '@react-native-community/slider';
import React from 'react';

import { Text, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { getFormattedTime } from '#libs/helpers/helpers';
import { usePlayerControls } from '#libs/hooks/hooks';
import { useProgress } from '#libs/packages/player/player';

import { TRACK_START_TIME } from './libs/constants';
import { styles } from './styles';

type Properties = {
  isPlaying: boolean;
  trackDuration: number;
};

const ProgressBar: React.FC<Properties> = ({ isPlaying, trackDuration }) => {
  const { position, duration } = useProgress();
  trackDuration;
  const { handleSeek } = usePlayerControls({ isPlaying });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.progress}>{getFormattedTime(position)}</Text>
      <Text style={styles.duration}>{getFormattedTime(duration)}</Text>
      <Slider
        minimumValue={TRACK_START_TIME}
        maximumValue={duration}
        minimumTrackTintColor={AppColor.GRAY_400}
        maximumTrackTintColor={AppColor.GRAY_300}
        thumbTintColor="transparent"
        value={position}
        onValueChange={handleSeek}
      />
    </View>
  );
};

export { ProgressBar };
