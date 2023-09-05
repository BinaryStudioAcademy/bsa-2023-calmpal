import home from '#assets/icons/home.svg';
import { AppRoute } from '#libs/enums/enums.js';
import { type Route } from '#libs/types/types.js';

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'Home', icon: home },
];

export { SIDEBAR_ROUTES };
