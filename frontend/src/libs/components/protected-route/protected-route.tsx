import { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '#libs/enums/enums.js';

type Properties = {
  children: ReactNode;
  redirectPath?: keyof typeof AppRoute;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.SIGN_IN,
}) => {
  const { user } = useSelector(() => ({
    user: null,
  }));
  const hasUser = Boolean(user);

  return hasUser ? <>{children}</> : <Navigate to={redirectPath} />;
};

export { ProtectedRoute };
