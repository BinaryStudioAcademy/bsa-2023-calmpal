import { type UserAuthResponseDto } from './user-auth-response-dto.types.js';

type UserSignUpResponseDto = {
  id: number;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
};

export { type UserSignUpResponseDto };
