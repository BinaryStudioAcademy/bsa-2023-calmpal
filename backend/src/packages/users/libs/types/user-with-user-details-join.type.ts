type UserWithUserDetailsJoin = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  details?: {
    fullName: string;
  };
};

export { type UserWithUserDetailsJoin };
