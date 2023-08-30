import { type UserAuthResponseDto } from './types.js';

type UserSignInResponseDto = {
  user: UserAuthResponseDto;
  token: string;
};

export { type UserSignInResponseDto };
