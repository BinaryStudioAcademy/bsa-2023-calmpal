import React from 'react';
import { ActivityIndicator } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const Loader: React.FC = () => {
  return <ActivityIndicator size="large" color={AppColor.BLUE_100} />;
};

export { Loader };
