type UserCreateQueryPayload = {
  email: string;
  passwordSalt: string;
  passwordHash: string;
  details: {
    fullName: string;
  };
};

export { type UserCreateQueryPayload };
