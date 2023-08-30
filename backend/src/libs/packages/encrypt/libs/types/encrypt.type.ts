type Encrypt = {
  generateSalt: (saltRounds: number) => Promise<string>;
  generateHash: (data: string, salt: string) => Promise<string>;
  compare: (data: string, hash: string) => Promise<boolean>;
};

export { type Encrypt };
