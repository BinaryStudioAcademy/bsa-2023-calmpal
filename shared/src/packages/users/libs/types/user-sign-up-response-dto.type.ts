import { type UserDetailsDto } from './user-details-dto.type.js';

type UserSignUpResponseDto = {
  user: UserDetailsDto;
  token: string;
};

export { type UserSignUpResponseDto };
