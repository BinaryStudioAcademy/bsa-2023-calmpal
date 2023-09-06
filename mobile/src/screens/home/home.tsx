import React from 'react';

import userImagePlaceholder from '#assets/img/user-placeholder.png';
import { Image, LinearGradient, Text, View } from '#libs/components/components';
import { useAppSelector } from '#libs/hooks/hooks';
import { type UserAuthResponseDto } from '#packages/users/users';

import { styles } from './styles';

const Dashboard: React.FC = () => {
  const { userName } = useAppSelector(({ auth }) => {
    return {
      userName: (auth.authenticatedUser as UserAuthResponseDto).fullName,
    };
  });

  return (
    <React.Fragment>
      <LinearGradient>
        <View style={styles.profileContainer}>
          <Image source={userImagePlaceholder} style={styles.userImage} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </LinearGradient>
    </React.Fragment>
  );
};

export { Dashboard };
