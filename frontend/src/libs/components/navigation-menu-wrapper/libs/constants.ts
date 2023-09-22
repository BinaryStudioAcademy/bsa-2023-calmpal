import { AppRoute, SidebarMode } from '#libs/enums/enums.js';
import { getUrlWithQueryString } from '#libs/helpers/helpers.js';
import { type Route } from '#libs/types/types.js';

const QUERY_STRING_PARAMETERS = {
  sidebarMode: SidebarMode.SHOW,
};

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'home', icon: 'home' },
  {
    path: getUrlWithQueryString(AppRoute.MEDITATION, QUERY_STRING_PARAMETERS),
    name: 'meditation',
    icon: 'meditation',
  },
  {
    path: getUrlWithQueryString(AppRoute.CHATS, QUERY_STRING_PARAMETERS),
    name: 'chats',
    icon: 'chats',
    iconWidth: 22,
    iconHeight: 22,
  },
  {
    path: getUrlWithQueryString(AppRoute.JOURNAL, QUERY_STRING_PARAMETERS),
    name: 'journal',
    icon: 'journal',
  },
  {
    path: getUrlWithQueryString(AppRoute.PROFILE, QUERY_STRING_PARAMETERS),
    name: 'profile',
    icon: 'user',
    iconWidth: 28,
    iconHeight: 28,
  },
];

export { SIDEBAR_ROUTES };
