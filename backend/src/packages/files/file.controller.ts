import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';

import { type FileService } from './file.service.js';
import { FilesApiPath } from './libs/enums/enums.js';
import { type FileUploadRequestDto } from './libs/types/types.js';

class FileController extends BaseController {
  private fileService: FileService;

  public constructor(logger: Logger, fileService: FileService) {
    super(logger, APIPath.FILES);

    this.fileService = fileService;

    this.addRoute({
      path: FilesApiPath.UPLOAD,
      method: 'POST',
      handler: (options) =>
        this.upload(
          options as APIHandlerOptions<{
            fileBuff: FileUploadRequestDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /files/upload:
   * post:
   *  description: Uploads a file
   *  requestBody:
   *    description: File data
   *    required: true
   *    content:
   *      multipart/form-data:
   *        schema:
   *          type: object
   *          properties:
   *            file:
   *              type: string
   *              format: binary
   *  responses:
   *    '201':
   *      description: Successful operation
   */
  private async upload(
    options: APIHandlerOptions<{
      fileBuff: FileUploadRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.fileService.create(options.fileBuff),
    };
  }
}

export { FileController };
