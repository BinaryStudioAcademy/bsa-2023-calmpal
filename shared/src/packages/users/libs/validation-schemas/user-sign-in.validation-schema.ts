import joi from 'joi';

import { type UserSignInRequestDto } from '../types/types.js';
import { commonUserFields } from './common-auth-fields.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
    ...commonUserFields
});

export { userSignIn };
