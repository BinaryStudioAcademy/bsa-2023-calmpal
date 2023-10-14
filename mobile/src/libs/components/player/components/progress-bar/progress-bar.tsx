import Slider from '@react-native-community/slider';
import React from 'react';

import { Text, View } from '~/libs/components/components';
import { AppColor } from '~/libs/enums/enums';
import { getFormattedTime } from '~/libs/helpers/helpers';
import { useEffect, usePlayerControls } from '~/libs/hooks/hooks';
import {
  player,
  TRACK_START_TIME,
  useProgress,
} from '~/libs/packages/player/player';

import { styles } from './styles';

type Properties = {
  isPlaying: boolean;
  trackDuration: number;
};

const ProgressBar: React.FC<Properties> = ({ isPlaying, trackDuration }) => {
  const { position, duration } = useProgress();
  const { handleSeek } = usePlayerControls({ isPlaying });

  const currentDuration = duration < trackDuration ? duration : trackDuration;

  useEffect(() => {
    if (position >= currentDuration && Boolean(currentDuration)) {
      void player.skipToNext();
    }
  }, [position, currentDuration]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.progress}>{getFormattedTime(position, false)}</Text>
      <Text style={styles.duration}>
        {getFormattedTime(currentDuration, false)}
      </Text>
      <Slider
        minimumValue={TRACK_START_TIME}
        maximumValue={currentDuration}
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
