import React, { type ReactNode } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';

import bottomBubbleImg from '#assets/bottom-bubble.png';
import backgroundImg from '#assets/sign-background.png';
import topBubbleImg from '#assets/top-bubble.png';
import { View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  children: ReactNode;
};

const SignBackground: React.FC<Properties> = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.backgroundWrapper}>
        <Image
          source={backgroundImg as ImageSourcePropType}
          style={styles.backgroundImage}
        />
      </View>
      <Image
        source={topBubbleImg as ImageSourcePropType}
        style={styles.topBubbleImage}
      />
      <Image
        source={bottomBubbleImg as ImageSourcePropType}
        style={styles.bottomBubbleImage}
      />

      {children}
    </View>
  );
};

export { SignBackground };
