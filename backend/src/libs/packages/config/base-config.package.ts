import convict, { type Config as LibraryConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '#libs/enums/enums.js';
import { type Logger } from '#libs/packages/logger/logger.js';

import { type Config, type EnvironmentSchema } from './libs/types/types.js';

class BaseConfig implements Config {
  private logger: Logger;

  public ENV: EnvironmentSchema;

  public constructor(logger: Logger) {
    this.logger = logger;

    config();

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => {
        this.logger.info(message);
      },
    });

    this.ENV = this.envSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  private get envSchema(): LibraryConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        ENVIRONMENT: {
          doc: 'Application environment',
          format: Object.values(AppEnvironment),
          env: 'NODE_ENV',
          default: null,
        },
        PORT: {
          doc: 'Port for incoming connections',
          format: Number,
          env: 'PORT',
          default: null,
        },
        HOST: {
          doc: 'Host for server app',
          format: String,
          env: 'HOST',
          default: null,
        },
      },
      DB: {
        CONNECTION_STRING: {
          doc: 'Database connection string',
          format: String,
          env: 'DB_CONNECTION_STRING',
          default: null,
        },
        DIALECT: {
          doc: 'Database dialect',
          format: String,
          env: 'DB_DIALECT',
          default: null,
        },
        POOL_MIN: {
          doc: 'Database pool min count',
          format: Number,
          env: 'DB_POOL_MIN',
          default: null,
        },
        POOL_MAX: {
          doc: 'Database pool max count',
          format: Number,
          env: 'DB_POOL_MAX',
          default: null,
        },
      },
      JWT: {
        SECRET_KEY: {
          doc: 'Secret key for JWT token generation',
          format: String,
          env: 'JWT_SECRET_KEY',
          default: null,
        },
        ALG: {
          doc: 'Algorithm for JWT token generation',
          format: String,
          default: 'HS256',
        },
      },
    });
  }
}

export { BaseConfig };
