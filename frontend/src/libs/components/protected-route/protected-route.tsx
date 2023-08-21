import { type ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '#libs/enums/enums.js';

type Properties = {
  component: ComponentType;
};

const mockUserData = (isUserExist: boolean): boolean => {
  return isUserExist;
};

const ProtectedRoute: React.FC<Properties> = ({
  component: Component,
  ...rest
}) => {
  const hasUser = mockUserData(false);

  return hasUser ? <Component {...rest} /> : <Navigate to={AppRoute.SIGN_IN} />;
};

export { ProtectedRoute };
