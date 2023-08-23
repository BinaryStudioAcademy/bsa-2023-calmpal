import bcrypt from 'bcryptjs';

class EncryptService {
  private saltRounds: number;

  public constructor(saltRounds: number) {
    this.saltRounds = saltRounds;
  }

  public async generateSalt(saltRounds?: number): Promise<string> {
    if (saltRounds) {
      return await bcrypt.genSalt(saltRounds);
    }
    if (this.saltRounds) {
      return await bcrypt.genSalt(this.saltRounds);
    }
    return await bcrypt.genSalt();
  }

  public async generateHash(
    password: string,
    passwordSalt?: string,
  ): Promise<string> {
    if (passwordSalt) {
      return await bcrypt.hash(password, passwordSalt);
    }
    return await bcrypt.hash(password, await this.generateSalt());
  }
}

export { EncryptService };
