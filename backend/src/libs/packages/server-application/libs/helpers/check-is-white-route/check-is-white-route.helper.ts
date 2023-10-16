import { type HTTPMethod } from '~/libs/packages/http/http.js';
import { WHITE_ROUTES } from '~/libs/packages/server-application/server-application.js';

type Parameters = {
  path: string;
  method: HTTPMethod;
};

const checkIsWhiteRoute = ({ path, method }: Parameters): boolean => {
  return WHITE_ROUTES.some((route) => {
    return (
      route.path.test(path) &&
      (route.methods as readonly HTTPMethod[]).includes(method)
    );
  });
};

export { checkIsWhiteRoute };
