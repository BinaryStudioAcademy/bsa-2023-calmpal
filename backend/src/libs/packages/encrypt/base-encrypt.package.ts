import bcrypt from 'bcryptjs';

import { config } from '#libs/packages/config/config.js';

import { type Encrypt } from './libs/types/encrypt.type.js';

class BaseEncrypt implements Encrypt {
  public async generateSalt(rounds?: number): Promise<string> {
    return await bcrypt.genSalt(rounds ?? config.ENV.ENCRYPT.NUMBER_OF_ROUNDS);
  }

  public async generateHash(data: string, salt: string): Promise<string> {
    return await bcrypt.hash(data, salt);
  }
}

export { BaseEncrypt };
