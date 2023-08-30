import home from '#assets/img/home.svg';
import { AppRoute } from '#libs/enums/enums.js';
import { type SidebarRoute } from '#libs/types/types.js';

const SIDEBAR_ROUTES: SidebarRoute[] = [
  { path: AppRoute.ROOT, name: 'home', icon: home },
];

export { SIDEBAR_ROUTES };
