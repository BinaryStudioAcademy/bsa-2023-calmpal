import { AppRoute, SidebarModeQueryStringValue } from '#libs/enums/enums.js';
import { getUrlWithQueryString } from '#libs/helpers/helpers.js';
import { type Route } from '#libs/types/types.js';

const urlWithQueryString = getUrlWithQueryString({
  sidebarMode: SidebarModeQueryStringValue.SHOW,
});

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'home', icon: 'home' },
  {
    path: urlWithQueryString(AppRoute.MEDITATION),
    name: 'meditation',
    icon: 'meditation',
  },
  { path: urlWithQueryString(AppRoute.CHATS), name: 'chats', icon: 'chats' },
  {
    path: urlWithQueryString(AppRoute.JOURNAL),
    name: 'journal',
    icon: 'journal',
  },
  { path: urlWithQueryString(AppRoute.PROFILE), name: 'profile', icon: 'user' },
];

export { SIDEBAR_ROUTES };
