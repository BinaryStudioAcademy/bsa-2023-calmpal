import React from 'react';

import Backward from '#assets/img/icons/backward.svg';
import Forward from '#assets/img/icons/forward.svg';
import Next from '#assets/img/icons/next.svg';
import Pause from '#assets/img/icons/pause.svg';
// import Play from '#assets/img/icons/play.svg';
import Previous from '#assets/img/icons/previous.svg';
import { View } from '#libs/components/components';

import { Button } from '../components';
import { styles } from './styles';

const Controls: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button
        Icon={Previous}
        onPress={(): null => {
          return null;
        }}
      />
      <Button
        Icon={Backward}
        onPress={(): null => {
          return null;
        }}
      />
      <Button
        Icon={Pause}
        onPress={(): null => {
          return null;
        }}
        isRounded
      />
      <Button
        Icon={Forward}
        onPress={(): null => {
          return null;
        }}
      />
      <Button
        Icon={Next}
        onPress={(): null => {
          return null;
        }}
      />
    </View>
  );
};
export { Controls };
