import React from 'react';

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
      <Button iconName="previous" onPress={handleSkipToPrevious} />
      <Button iconName="backward" onPress={handleSkipBackward} />
      <Button
        iconName={isPlaying ? 'pause' : 'play'}
        onPress={handlePlayPause}
        isRounded
      />
      <Button iconName="forward" onPress={handleSkipForward} />
      <Button iconName="next" onPress={handleSkipToNext} />
    </View>
  );
};
export { Controls };
