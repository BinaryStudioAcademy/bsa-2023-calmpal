import home from '#assets/icons/home.svg';
import meditation from '#assets/icons/meditation.svg';
import { AppRoute } from '#libs/enums/enums.js';
import { type Route } from '#libs/types/types.js';

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'home', icon: home },
  { path: AppRoute.MEDITATION_LIST, name: 'meditation-list', icon: meditation },
];

export { SIDEBAR_ROUTES };
