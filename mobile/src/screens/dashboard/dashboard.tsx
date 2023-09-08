import React from 'react';

import userImagePlaceholder from '#assets/img/user-placeholder.png';
import { Image, LinearGradient, Text, View } from '#libs/components/components';
import { useAppSelector } from '#libs/hooks/hooks';
import { type UserAuthResponseDto } from '#packages/users/users';

import { styles } from './styles';

const Dashboard: React.FC = () => {
  const { fullName } = useAppSelector(({ auth }) => {
    return {
      fullName: (auth.authenticatedUser as UserAuthResponseDto).fullName,
    };
  });

  return (
    <LinearGradient>
      <View style={styles.profileContainer}>
        <Image source={userImagePlaceholder} style={styles.userImage} />
        <Text style={styles.userName}>{fullName}</Text>
      </View>
    </LinearGradient>
  );
};

export { Dashboard };
