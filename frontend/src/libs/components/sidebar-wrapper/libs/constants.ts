import { AppRoute } from '#libs/enums/enums.js';
import { type Route } from '#libs/types/types.js';

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'home', icon: 'home' },
  { path: AppRoute.MEDITATION, name: 'meditations', icon: 'meditation' },
  { path: AppRoute.CHATS, name: 'chats', icon: 'chats' },
];

export { SIDEBAR_ROUTES };
