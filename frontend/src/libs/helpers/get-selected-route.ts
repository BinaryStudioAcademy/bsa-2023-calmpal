import { AppRoute } from '#libs/enums/app-route.enum.js';

type Properties = {
  pathname: string;
  routePath: string;
};

const getSelectedRoute = ({ pathname, routePath }: Properties): boolean => {
  const isRootPathSelected = pathname === routePath;
  const isChildPathSelected =
    pathname !== AppRoute.ROOT && routePath.startsWith(pathname);

  return isChildPathSelected || isRootPathSelected;
};

export { getSelectedRoute };
