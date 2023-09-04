import chat from '#assets/icons/chat-sidebar-logo.svg';
import home from '#assets/img/home.svg';
import { AppRoute } from '#libs/enums/enums.js';
import { type Route } from '#libs/types/types.js';

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'home', icon: home },
  { path: AppRoute.CHAT, name: 'chat', icon: chat },
];

export { SIDEBAR_ROUTES };
