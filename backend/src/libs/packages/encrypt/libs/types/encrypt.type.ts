type Encrypt = {
  generateSalt: (saltRounds: number) => Promise<string>;
  generateHash: (data: string, salt: string) => Promise<string>;
};

export { type Encrypt };
