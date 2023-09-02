import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AppColor, DataStatus } from '#libs/enums/enums';
import { useAppSelector } from '#libs/hooks/hooks';

import { styles } from './styles';

const Loader: React.FC = () => {
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUser: auth.authenticatedUser,
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));
  if (
    authenticatedUserDataStatus !== DataStatus.IDLE &&
    authenticatedUserDataStatus !== DataStatus.PENDING
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColor.BLUE_200} />
    </View>
  );
};

export { Loader };
