import React from 'react';

import { View } from '#libs/components/components';

import { Controls, ProgressBar } from './components/components';

const AudioPlayer: React.FC = () => {
  return (
    <View>
      <ProgressBar timeProgress={25} duration={65} />
      <Controls />
    </View>
  );
};

export { AudioPlayer };
