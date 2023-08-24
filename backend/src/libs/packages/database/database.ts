import { config } from '#libs/packages/config/config.js';
import { logger } from '#libs/packages/logger/logger.js';

import { BaseDatabase } from './base-database.package.js';

const database = new BaseDatabase(config, logger);

export { database };
export { Abstract as AbstractModel } from './abstract.model.js';
export { DatabaseTableName } from './libs/enums/enums.js';
export { type Database } from './libs/types/types.js';
