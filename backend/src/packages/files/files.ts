import { config } from '#libs/packages/config/config.js';
import { logger } from '#libs/packages/logger/logger.js';

import { FileController } from './file.controller.js';
import { FileModel } from './file.model.js';
import { FileRepository } from './file.repository.js';
import { FileService } from './file.service.js';

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService({
  fileRepository,
  region: config.ENV.AWS.REGION,
  accessKeyId: config.ENV.AWS.ACCESS_KEY_ID,
  secretAccessKey: config.ENV.AWS.SECRET_ACCESS_KEY,
  bucketName: config.ENV.AWS.BUCKET_NAME,
});
const fileController = new FileController(logger, fileService);

export { fileController, fileService };
export { FileModel } from './file.model.js';
export { type FileService } from './file.service.js';
export {
  type FileCommonQueryResponse,
  type FileCreateQueryPayload,
  type FileUploadRequestDto,
} from './libs/types/types.js';
