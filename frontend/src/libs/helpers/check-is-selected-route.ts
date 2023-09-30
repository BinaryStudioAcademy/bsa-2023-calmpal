import { ROUTER_ITEMS } from '#libs/components/router-provider/libs/constants/constants.js';
import { findNestedChildRoute } from '#libs/components/router-provider/libs/helpers/helpers.js';
import { type Route } from '#libs/types/types.js';

type Properties = {
  pathname: string;
  routerParameters: Partial<Record<string, string>>;
  selectedRoute: Route;
};

const checkIsSelectedRoute = ({
  pathname,
  routerParameters = {},
  selectedRoute,
}: Properties): boolean => {
  const isRootPathSelected = pathname === selectedRoute.path;
  const isChildPathSelected =
    ROUTER_ITEMS.find((route) => {
      return findNestedChildRoute({
        route,
        targetPath: pathname,
        routerParameters,
      });
    })?.path === selectedRoute.path;

  return isChildPathSelected || isRootPathSelected;
};

export { checkIsSelectedRoute };
