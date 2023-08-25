import { APIPath } from '#libs/enums/enums.js';
import { AuthApiPath } from '#packages/auth/auth.js';

const SERVED_PAGE_PATH = '/*';

const WHITE_ROUTES = [
  { path: `/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_UP}`, methods: ['POST'] },
  { path: `/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_IN}`, methods: ['POST'] },
  { path: `${SERVED_PAGE_PATH}`, methods: ['GET'] },
] as const;

export { SERVED_PAGE_PATH, WHITE_ROUTES };
