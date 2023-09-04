import React from 'react';

import { Text, View } from '#libs/components/components';

type Properties = {
  timeProgress: number;
  duration: number;
};

const ProgressBar: React.FC<Properties> = ({ timeProgress, duration }) => {
  return (
    <View>
      <View>
        <Text>{timeProgress}</Text>
        <Text>{duration}</Text>
      </View>
    </View>
  );
};

export { ProgressBar };
