import { type UserAuthResponseDto } from './user-auth-response-dto.types.js';

type UserSignUpResponseDto = {
  user: UserAuthResponseDto;
  token: string;
};

export { type UserSignUpResponseDto };
