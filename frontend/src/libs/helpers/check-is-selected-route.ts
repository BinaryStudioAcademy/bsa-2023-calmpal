import { AppRoute } from '#libs/enums/app-route.enum.js';
import { type Route } from '#libs/types/types.js';

type Properties = {
  pathname: string;
  selectedRoute: Route;
};

const checkIsSelectedRoute = ({
  pathname,
  selectedRoute,
}: Properties): boolean => {
  const isRootPathSelected = pathname === selectedRoute.path;
  const isChildPathSelected =
    pathname !== AppRoute.ROOT && selectedRoute.path.startsWith(pathname);

  return isChildPathSelected || isRootPathSelected;
};

export { checkIsSelectedRoute };
