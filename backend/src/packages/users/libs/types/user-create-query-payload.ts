type UserCreateQueryPayload = {
  email: string;
  passwordSalt: string;
  passwordHash: string;
  details: {
    fullName: string;
    isSurveyCompleted: boolean;
  };
};

export { type UserCreateQueryPayload };
