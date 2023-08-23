type UserAuthResponseDto = {
  id: number;
  email: string;
};

type UserSignUpResponseDto = {
  user: UserAuthResponseDto;
  token: string;
};

export { type UserSignUpResponseDto };
