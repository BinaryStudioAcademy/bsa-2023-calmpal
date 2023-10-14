import convict, { type Config as LibraryConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type Logger } from '~/libs/packages/logger/logger.js';

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
        USERNAME: {
          doc: 'Database connection username',
          format: String,
          env: 'DB_USERNAME',
          default: null,
        },
        PASSWORD: {
          doc: 'Database connection password',
          format: String,
          env: 'DB_PASSWORD',
          default: null,
        },
        HOST: {
          doc: 'Database connection host',
          format: String,
          env: 'DB_HOST',
          default: null,
        },
        PORT: {
          doc: 'Database connection port',
          format: Number,
          env: 'DB_PORT',
          default: null,
        },
        NAME: {
          doc: 'Database name to connect',
          format: String,
          env: 'DB_NAME',
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
      AWS: {
        REGION: {
          doc: 'Region of the AWS account',
          format: String,
          env: 'AWS_REGION',
          default: null,
        },
        ACCESS_KEY_ID: {
          doc: 'Access key ID for the AWS account',
          format: String,
          env: 'AWS_ACCESS_KEY_ID',
          default: null,
        },
        SECRET_ACCESS_KEY: {
          doc: 'Secret access key for the AWS account',
          format: String,
          env: 'AWS_SECRET_ACCESS_KEY',
          default: null,
        },
        BUCKET_NAME: {
          doc: 'Name of the S3 Bucket in the the AWS account',
          format: String,
          env: 'AWS_BUCKET_NAME',
          default: null,
        },
      },
      ENCRYPT: {
        NUMBER_OF_ROUNDS: {
          doc: 'Default number of rounds for salt generation',
          format: Number,
          default: 10,
        },
      },
      STRIPE: {
        SECRET_KEY: {
          doc: 'Stripe secret key',
          format: String,
          env: 'STRIPE_SECRET_KEY',
          default: null,
        },
      },
      OPEN_AI: {
        API_KEY: {
          doc: 'Api key for the Open AI account',
          format: String,
          env: 'OPEN_AI_API_KEY',
          default: null,
        },
        BASE_URL: {
          doc: 'Base URL for Open Ai API calls',
          format: String,
          env: 'BASE_OPEN_AI_URL',
          default: null,
        },
      },
    });
  }
}

export { BaseConfig };
