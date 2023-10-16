import { config } from '~/libs/packages/config/config.js';

import { S3 } from './s3.package.js';

const s3 = new S3({
  region: config.ENV.AWS.REGION,
  accessKeyId: config.ENV.AWS.ACCESS_KEY_ID,
  secretAccessKey: config.ENV.AWS.SECRET_ACCESS_KEY,
  bucketName: config.ENV.AWS.BUCKET_NAME,
});

export { s3 };
export { type S3 } from './s3.package.js';
