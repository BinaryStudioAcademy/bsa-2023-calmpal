import { type RouteObject } from 'react-router-dom';

import { replaceTemplateWithValue } from '~/libs/helpers/helpers.js';

const wrapWithDynamicRouteString = (value: string): string => {
  return `:${value}`;
};

const findNestedChildRoute = (config: {
  route: Pick<RouteObject, 'path' | 'children'>;
  routerParameters: Record<string, unknown>;
  targetPath: RouteObject['path'];
}): RouteObject | null => {
  const { route, targetPath, routerParameters } = config;

  if (!route.children) {
    return null;
  }

  const childRoute = route.children.find(({ path }) => {
    const pathWithDynamicRoute = replaceTemplateWithValue({
      template: path as string,
      replacements: routerParameters,
      wrapWith: wrapWithDynamicRouteString,
    });

    return pathWithDynamicRoute === targetPath;
  });

  if (childRoute) {
    return childRoute;
  }

  return (
    route.children.find((it) => {
      return findNestedChildRoute({ route: it, routerParameters, targetPath });
    }) ?? null
  );
};

export { findNestedChildRoute };
