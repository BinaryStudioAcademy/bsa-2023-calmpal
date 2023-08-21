import { type ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '#libs/enums/enums.js';

type Properties = {
  component: ComponentType;
};

const ProtectedRoute: React.FC<Properties> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useSelector(() => ({
    user: null,
  }));
  const hasUser = Boolean(user);

  return hasUser ? <Component {...rest} /> : <Navigate to={AppRoute.SIGN_IN} />;
};

export { ProtectedRoute };
