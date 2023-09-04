import home from '#assets/img/home.svg';
import profile from '#assets/img/profile.svg';
import { AppRoute } from '#libs/enums/enums.js';
import { type Route } from '#libs/types/types.js';

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'home', icon: home },
  { path: AppRoute.PROFILE, name: 'profile', icon: profile },
];

export { SIDEBAR_ROUTES };
