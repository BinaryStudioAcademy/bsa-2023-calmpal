import React, { type FC, type ReactNode } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';

import bottomBubbleImg from '#assets/bottom-bubble.png';
import backgroundImg from '#assets/sign-background.png';
import topBubbleImg from '#assets/top-bubble.png';
import { View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  children: ReactNode;
};
const SignBackground: FC<Properties> = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.backgroundWrapper}>
        <Image
          source={backgroundImg as ImageSourcePropType}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <Image
        source={topBubbleImg as ImageSourcePropType}
        style={{ position: 'absolute', top: 30, right: 0 }}
      />
      <Image
        source={bottomBubbleImg as ImageSourcePropType}
        style={{ position: 'absolute', bottom: 60, left: 0 }}
      />
      {children}
    </View>
  );
};

export { SignBackground };
