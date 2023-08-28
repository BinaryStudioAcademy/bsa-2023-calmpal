import { config } from '#libs/packages/config/config.js';
import { logger } from '#libs/packages/logger/logger.js';

import { AWSService } from './aws.service.js';
import { FileController } from './file.controller.js';
import { FileModel } from './file.model.js';
import { FileRepository } from './file.repository.js';
import { FileService } from './file.service.js';

const awsService = new AWSService({
  region: config.ENV.AWS.REGION,
  accessKeyId: config.ENV.AWS.ACCESS_KEY_ID,
  secretAccessKey: config.ENV.AWS.SECRET_ACCESS_KEY,
  bucketName: config.ENV.AWS.BUCKET_NAME,
});

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService({
  fileRepository,
  awsService: awsService,
});
const fileController = new FileController(logger, fileService);

export { awsService, fileController, fileService };
export { type AWSService } from './aws.service.js';
export { FileModel } from './file.model.js';
export { type FileService } from './file.service.js';
export {
  type FileUploadRequestDto,
  type FileUploadResponseDto,
} from './libs/types/types.js';
