import React from 'react';
import { ActivityIndicator } from 'react-native';

import { AppColors } from '#libs/enums/ui/app-colors';

const Loader: React.FC = () => {
  return <ActivityIndicator size="large" color={AppColors.BLUE_100} />;
};

export { Loader };
