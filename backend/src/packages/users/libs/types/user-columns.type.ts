type UserColumns = {
  id: number;
  email: string;
  fullName: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: Date;
  updatedAt: Date;
};

export { type UserColumns };
