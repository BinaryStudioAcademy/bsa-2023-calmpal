import { AppRoute } from '#libs/enums/app-route.enum.js';

type Properties = {
  pathname: string;
  routePath: string;
};

const isRouteSelected = ({ pathname, routePath }: Properties): boolean => {
  const isRootPathSelected = pathname === routePath;
  const isOtherPathSelected =
    pathname !== AppRoute.ROOT && routePath.startsWith(pathname);

  return isOtherPathSelected || isRootPathSelected;
};

export { isRouteSelected };
