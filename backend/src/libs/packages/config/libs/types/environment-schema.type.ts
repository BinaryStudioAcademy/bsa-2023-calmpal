import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    HOST: string;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  DB: {
    USERNAME: string;
    PASSWORD: string;
    HOST: string;
    PORT: number;
    NAME: string;
    DIALECT: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
  JWT: {
    SECRET_KEY: string;
    ALG: string;
  };
  AWS: {
    REGION: string;
    ACCESS_KEY_ID: string;
    SECRET_ACCESS_KEY: string;
    BUCKET_NAME: string;
  };
  ENCRYPT: {
    NUMBER_OF_ROUNDS: number;
  };
  STRIPE: {
    SECRET_KEY: string;
  };
  OPEN_AI: {
    API_KEY: string;
    BASE_URL: string;
  };
};

export { type EnvironmentSchema };
