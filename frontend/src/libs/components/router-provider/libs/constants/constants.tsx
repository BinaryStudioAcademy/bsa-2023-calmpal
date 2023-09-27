import { type RouteObject } from 'react-router-dom';

import { AppRoute } from '#libs/enums/enums.js';

const ROUTER_ITEMS: Pick<RouteObject, 'path' | 'children'>[] = [
  { path: AppRoute.MEDITATION },
  { path: AppRoute.SIGN_IN },
  { path: AppRoute.SIGN_UP },
  { path: AppRoute.ROOT },
  { path: AppRoute.SIGN_UP_SURVEY },
  {
    path: AppRoute.CHATS,
    children: [{ path: AppRoute.CHATS_$ID }],
  },
  { path: AppRoute.JOURNAL, children: [{ path: AppRoute.JOURNAL_$ID }] },
  { path: AppRoute.PROFILE },
];

export { ROUTER_ITEMS };
