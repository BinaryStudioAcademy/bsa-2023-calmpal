import { APIPath } from '#libs/enums/enums.js';
import { AuthApiPath } from '#packages/auth/libs/enums/enums.js';

const WHITE_ROUTES = [
  `/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
  `/api/v1${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
] as const;

export { WHITE_ROUTES };
