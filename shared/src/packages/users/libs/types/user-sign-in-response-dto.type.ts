import { type UserAuthResponseDto } from './user-auth-response-dto.types.js';

type UserSignInResponseDto = {
  user: UserAuthResponseDto;
  token: string;
};

export { type UserSignInResponseDto };
