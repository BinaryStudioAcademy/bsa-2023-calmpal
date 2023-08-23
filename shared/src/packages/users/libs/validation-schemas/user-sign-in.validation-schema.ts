import joi from 'joi';

import { type UserSignInRequestDto } from '../types/types.js';
import { commonAuthFields } from './common-auth-fields.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
  ...commonAuthFields,
});

export { userSignIn };
