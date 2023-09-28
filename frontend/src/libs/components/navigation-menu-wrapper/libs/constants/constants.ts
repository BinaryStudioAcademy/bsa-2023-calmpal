import { AppRoute, SidebarMode } from '#libs/enums/enums.js';
import { getUrlWithQueryString } from '#libs/helpers/helpers.js';
import { type Route, type ValueOf } from '#libs/types/types.js';

const QUERY_STRING_PARAMETERS = {
  sidebarMode: SidebarMode.SHOW,
};

const wrapPathWith = (
  path: ValueOf<typeof AppRoute>,
): ValueOf<typeof AppRoute> => {
  return getUrlWithQueryString(path, QUERY_STRING_PARAMETERS);
};

const SIDEBAR_ROUTES: Route[] = [
  { path: AppRoute.ROOT, name: 'home', icon: 'home' },
  {
    path: AppRoute.MEDITATION,
    wrapPathWith,
    name: 'meditation',
    icon: 'meditation',
  },
  {
    path: AppRoute.CHATS,
    wrapPathWith,
    name: 'chats',
    icon: 'chats',
  },
  {
    path: AppRoute.JOURNAL,
    wrapPathWith,
    name: 'journal',
    icon: 'journal',
  },
  {
    path: AppRoute.PROFILE,
    wrapPathWith,
    name: 'profile',
    icon: 'user',
  },
];

export { SIDEBAR_ROUTES };
