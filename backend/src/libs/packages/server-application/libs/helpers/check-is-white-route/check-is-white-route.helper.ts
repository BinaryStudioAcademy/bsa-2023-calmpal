import { type HTTPMethod } from '#libs/packages/http/http.js';
import { WHITE_ROUTES } from '#libs/packages/server-application/server-application.js';

const checkIsWhiteRoute = ({
  path,
  method,
}: {
  path: string;
  method: HTTPMethod;
}): boolean =>
  WHITE_ROUTES.some((route) => route.path === path && route.method === method);

export { checkIsWhiteRoute };
