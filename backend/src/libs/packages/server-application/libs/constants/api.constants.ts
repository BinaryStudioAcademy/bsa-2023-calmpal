import { APIPath } from '#libs/enums/enums.js';
import { AuthApiPath } from '#packages/auth/libs/enums/enums.js';

const WHITE_ROUTES = [
  { path: `/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_UP}`, method: 'POST' },
  { path: `/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_IN}`, method: 'POST' },
] as const;

export { WHITE_ROUTES };
