import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Card, Icon, LinearGradient, View } from '#libs/components/components';
import { AppColor, ProfileScreenName } from '#libs/enums/enums';
import { useNavigation } from '#libs/hooks/hooks';
import { type ProfileNavigationParameterList } from '#libs/types/types';

import { styles } from './styles';

const Profile: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<ProfileNavigationParameterList>>();

  const handleCategoryPress = (): void => {
    navigation.navigate(ProfileScreenName.SETTINGS);
  };

  return (
    <LinearGradient>
      <View style={styles.container}>
        <Card
          iconSourceSvg={<Icon name="bell" color={AppColor.WHITE} />}
          title="Notifications and Reminders"
          onPress={handleCategoryPress}
        />
      </View>
    </LinearGradient>
  );
};

export { Profile };
