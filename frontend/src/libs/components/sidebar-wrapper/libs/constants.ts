import home from '#assets/img/home.svg';
import meditation from '#assets/img/meditation.svg';
import { AppRoute } from '#libs/enums/enums.js';
import { type SidebarRoute } from '#libs/types/types.js';

const SIDEBAR_ROUTES: SidebarRoute[] = [
  { path: AppRoute.ROOT, name: 'home', icon: home },
  { path: AppRoute.MEDITATION_LIST, name: 'meditation-list', icon: meditation },
];

export { SIDEBAR_ROUTES };
