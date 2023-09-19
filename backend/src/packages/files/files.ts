import { logger } from '#libs/packages/logger/logger.js';
import { s3 } from '#libs/packages/s3/s3.js';

import { FileController } from './file.controller.js';
import { FileModel } from './file.model.js';
import { FileRepository } from './file.repository.js';
import { FileService } from './file.service.js';

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService({
  fileRepository,
  s3,
});
const fileController = new FileController(logger, fileService);
export { fileController, fileService };
export { FileModel } from './file.model.js';
export { type FileService } from './file.service.js';
export {
  FileUploadValidationMessage,
  FileUploadValidationRule,
} from './libs/enums/enums.js';
export {
  type FileGetAllItemResponseDto,
  type FileUploadRequestDto,
} from './libs/types/types.js';
