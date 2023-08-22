import { type UserDetailsDto } from './types.js';

type UserSignInResponseDto = {
  user: UserDetailsDto;
  token: string;
};

export { type UserSignInResponseDto };
