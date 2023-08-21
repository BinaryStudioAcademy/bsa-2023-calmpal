import { WHITE_ROUTES } from '#libs/packages/server-application/libs/constants/constants.js';

const isWhiteRoute = (route: string): boolean =>
  (WHITE_ROUTES as readonly string[]).includes(route);

export { isWhiteRoute };
