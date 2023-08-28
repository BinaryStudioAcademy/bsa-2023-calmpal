import { type NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { type ReactNode } from 'react';

import { RootScreenName } from '#libs/enums/enums';
import { useAppSelector, useEffect, useNavigation } from '#libs/hooks/hooks';
import { type RootNavigationParameterList } from '#libs/types/types';

type Properties = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
  const { user } = useAppSelector((store) => store.auth);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!hasUser) {
      navigation.navigate(RootScreenName.SIGN_IN);
    }
  }, [hasUser, navigation]);

  return <>{children}</>;
};

export { ProtectedRoute };
