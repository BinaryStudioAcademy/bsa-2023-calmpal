import { EncryptService } from './encrypt.service.js';

const DEFAULT_ROUNDS = 10;
const encryptService = new EncryptService(DEFAULT_ROUNDS);

export { encryptService };
