type UserWithUserDetailsJoin = {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    passwordSalt: string;
    passwordHash: string;
    details?: {
      fullName: string;
    }
  };

export { type UserWithUserDetailsJoin };