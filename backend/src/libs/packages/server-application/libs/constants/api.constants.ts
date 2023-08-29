import { APIPath } from '#libs/enums/enums.js';
import { AuthApiPath } from '#packages/auth/auth.js';

const SERVED_PAGE_PATH = '^/\\*$';

const WHITE_ROUTES = [
  {
    path: new RegExp(`^/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_UP}$`),
    methods: ['POST'],
  },
  {
    path: new RegExp(`^/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_IN}$`),
    methods: ['POST'],
  },
  { path: new RegExp(`^/api/v1${APIPath.DOCUMENTATION}/*`), methods: ['GET'] },
  { path: new RegExp(SERVED_PAGE_PATH), methods: ['GET'] },
] as const;

export { WHITE_ROUTES };
