import { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type Properties = {
  children: ReactNode;
  redirectPath?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.SIGN_IN,
}) => {
  //TODO: change this when user data will be stored in redux state
  const { user } = useSelector(() => ({
    user: null,
  }));
  const hasUser = Boolean(user);

  return hasUser ? <>{children}</> : <Navigate to={redirectPath} />;
};

export { ProtectedRoute };
