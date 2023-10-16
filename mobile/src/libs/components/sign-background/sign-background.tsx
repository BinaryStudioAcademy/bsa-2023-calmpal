import React, { type ReactNode } from 'react';
import { Image } from 'react-native';

import bottomBubbleImage from '~/assets/img/bottom-bubble.png';
import backgroundImage from '~/assets/img/sign-background.png';
import topBubbleImage from '~/assets/img/top-bubble.png';
import { View } from '~/libs/components/components';

import { styles } from './styles';

type Properties = {
  children: ReactNode;
};

const SignBackground: React.FC<Properties> = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.backgroundWrapper}>
        <Image source={backgroundImage} style={styles.backgroundImage} />
      </View>
      <Image source={topBubbleImage} style={styles.topBubbleImage} />
      <Image source={bottomBubbleImage} style={styles.bottomBubbleImage} />
      {children}
    </View>
  );
};

export { SignBackground };
