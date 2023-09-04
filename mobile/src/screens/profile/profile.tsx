import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import {
  Card,
  Header,
  Icon,
  LinearGradient,
  View,
} from '#libs/components/components';
import { AppColor, RootScreenName } from '#libs/enums/enums';
import { useNavigation } from '#libs/hooks/hooks';
import { type RootNavigationParameterList } from '#libs/types/types';

import { styles } from './styles';

const Profile: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<RootNavigationParameterList>>();

  const handleCategoryPress = (): void => {
    navigation.navigate(RootScreenName.SETTINGS);
  };

  return (
    <LinearGradient>
      <Header isArrowVisible />
      <View style={styles.container}>
        <Card
          iconSourceSvg={<Icon name={'bell'} color={AppColor.WHITE} />}
          title="Notifications and Reminders"
          onPress={handleCategoryPress}
        />
      </View>
    </LinearGradient>
  );
};

export { Profile };
