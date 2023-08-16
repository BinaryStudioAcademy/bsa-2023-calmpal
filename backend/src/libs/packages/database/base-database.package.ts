import knex, { type Knex } from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

import { AppEnvironment } from '#libs/enums/enums.js';
import { type Config } from '#libs/packages/config/config.js';
import { type Logger } from '#libs/packages/logger/logger.js';

import { DatabaseTableName } from './libs/enums/enums.js';
import { type Database } from './libs/interfaces/interfaces.js';

class BaseDatabase implements Database {
  private appConfig: Config;

  private logger: Logger;

  public constructor(config: Config, logger: Logger) {
    this.appConfig = config;
    this.logger = logger;
  }

  public connect(): ReturnType<Database['connect']> {
    this.logger.info('Establish DB connection...');

    Model.knex(knex.default(this.environmentConfig));
  }

  public get environmentsConfig(): Database['environmentsConfig'] {
    return {
      [AppEnvironment.DEVELOPMENT]: this.initialConfig,
      [AppEnvironment.PRODUCTION]: this.initialConfig,
    };
  }

  private get initialConfig(): Knex.Config {
    return {
      client: this.appConfig.ENV.DB.DIALECT,
      connection: this.appConfig.ENV.DB.CONNECTION_STRING,
      pool: {
        min: this.appConfig.ENV.DB.POOL_MIN,
        max: this.appConfig.ENV.DB.POOL_MAX,
      },
      migrations: {
        directory: 'src/db/migrations',
        tableName: DatabaseTableName.MIGRATIONS,
      },
      debug: false,
      ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true }),
    };
  }

  private get environmentConfig(): Knex.Config {
    return this.environmentsConfig[this.appConfig.ENV.APP.ENVIRONMENT];
  }
}

export { BaseDatabase };
export { DatabaseTableName } from './libs/enums/enums.js';
export { type Database } from './libs/interfaces/interfaces.js';
