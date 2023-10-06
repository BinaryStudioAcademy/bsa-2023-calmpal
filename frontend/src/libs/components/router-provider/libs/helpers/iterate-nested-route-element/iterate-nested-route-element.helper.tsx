import { type RouteObject } from 'react-router-dom';

import { ProtectedRoute } from '#libs/components/components.js';
import { type AppRoute } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import { routerPathToElement } from '../../maps/maps.js';

const iterateNestedRouteElement = (
  route: Pick<RouteObject, 'path' | 'children'>,
): RouteObject => {
  const { type, element } =
    routerPathToElement[route.path as ValueOf<typeof AppRoute>];

  if (type === 'private') {
    (route as RouteObject).element = <ProtectedRoute>{element}</ProtectedRoute>;
  } else {
    (route as RouteObject).element = element;
  }

  route.children?.forEach((childRoute) => {
    iterateNestedRouteElement(childRoute);
  });

  return route as RouteObject;
};

export { iterateNestedRouteElement };
