import React from 'react';

import userImagePlaceholder from '#assets/img/user-placeholder.png';
import { Image, LinearGradient, View } from '#libs/components/components';

import { styles } from './styles';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <LinearGradient>
        <View>
          <Image source={userImagePlaceholder} style={styles.userImage} />
        </View>
      </LinearGradient>
    </React.Fragment>
  );
};

export { Home };
