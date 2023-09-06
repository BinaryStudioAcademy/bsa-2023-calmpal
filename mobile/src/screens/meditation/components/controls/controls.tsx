import React from 'react';

import Backward from '#assets/img/icons/backward.svg';
import Forward from '#assets/img/icons/forward.svg';
import Next from '#assets/img/icons/next.svg';
import Pause from '#assets/img/icons/pause.svg';
import Play from '#assets/img/icons/play.svg';
import Previous from '#assets/img/icons/previous.svg';
import { View } from '#libs/components/components';
import { useTrackPlayerControls } from '#libs/hooks/hooks';

import { Button } from './components/components';
import { styles } from './styles';

type Properties = {
  isPlaying: boolean;
};

const Controls: React.FC<Properties> = ({ isPlaying }) => {
  const {
    handleSkipToPrevious,
    handleSkipBackward,
    handlePlayPause,
    handleSkipForward,
    handleSkipToNext,
  } = useTrackPlayerControls({ isPlaying });

  return (
    <View style={styles.container}>
      <Button Icon={Previous} onPress={handleSkipToPrevious} />
      <Button Icon={Backward} onPress={handleSkipBackward} />
      <Button
        Icon={isPlaying ? Pause : Play}
        onPress={handlePlayPause}
        isRounded
      />
      <Button Icon={Forward} onPress={handleSkipForward} />
      <Button Icon={Next} onPress={handleSkipToNext} />
    </View>
  );
};
export { Controls };
