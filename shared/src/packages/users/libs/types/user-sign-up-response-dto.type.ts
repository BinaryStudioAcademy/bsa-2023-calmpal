import { type UserAuthResponseDto } from './types.js';

type UserSignUpResponseDto = {
  user: UserAuthResponseDto;
  token: string;
};

export { type UserSignUpResponseDto };
