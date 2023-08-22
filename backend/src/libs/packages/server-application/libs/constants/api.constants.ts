import { APIPath } from '#libs/enums/enums.js';
import { AuthApiPath } from '#packages/auth/auth.js';

const WHITE_ROUTES = [
  { path: `/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_UP}`, methods: ['POST'] },
  { path: `/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_IN}`, methods: ['POST'] },
] as const;

export { WHITE_ROUTES };
