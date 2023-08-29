import bcrypt from 'bcryptjs';

import { type Encrypt } from './libs/types/types.js';

class BaseEncrypt implements Encrypt {
  public async generateSalt(rounds: number): Promise<string> {
    return await bcrypt.genSalt(rounds);
  }

  public async generateHash(data: string, salt: string): Promise<string> {
    return await bcrypt.hash(data, salt);
  }

  public async compare(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash);
  }
}

export { BaseEncrypt };
