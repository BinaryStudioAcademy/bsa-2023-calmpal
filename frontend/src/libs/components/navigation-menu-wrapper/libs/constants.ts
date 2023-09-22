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
    iconWidth: 22,
    iconHeight: 20,
  },
  {
    path: getUrlWithQueryString(AppRoute.CHATS, QUERY_STRING_PARAMETERS),
    name: 'chats',
    icon: 'chats',
    iconWidth: 21,
    iconHeight: 21,
  },
  {
    path: getUrlWithQueryString(AppRoute.JOURNAL, QUERY_STRING_PARAMETERS),
    name: 'journal',
    icon: 'journal',
    iconWidth: 24,
    iconHeight: 20,
  },
  {
    path: getUrlWithQueryString(AppRoute.PROFILE, QUERY_STRING_PARAMETERS),
    name: 'profile',
    icon: 'user',
    iconWidth: 29,
    iconHeight: 29,
  },
];

export { SIDEBAR_ROUTES };
