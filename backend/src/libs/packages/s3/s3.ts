import { config } from '#libs/packages/config/config.js';

import { S3Package } from './s3.package.js';

const s3Package = new S3Package({
  region: config.ENV.AWS.REGION,
  accessKeyId: config.ENV.AWS.ACCESS_KEY_ID,
  secretAccessKey: config.ENV.AWS.SECRET_ACCESS_KEY,
  bucketName: config.ENV.AWS.BUCKET_NAME,
});

export { s3Package };
export { type S3Package } from './s3.package.js';
