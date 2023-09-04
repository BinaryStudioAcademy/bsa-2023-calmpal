import React from 'react';

import { View } from '#libs/components/components';

import { Controls, ProgressBar } from './components/components';

const AudioPlayer: React.FC = () => {
  return (
    <View>
      <ProgressBar timeProgress={3} duration={3} />
      <Controls />
    </View>
  );
};

export { AudioPlayer };
