import { APIPath } from '~/libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';

import { type FileService } from './file.service.js';
import { FilesApiPath } from './libs/enums/enums.js';
import { type FileUploadRequestDto } from './libs/types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      File:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          url:
 *            type: string
 *          contentType:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          errorType:
 *            type: string
 */
class FileController extends BaseController {
  private fileService: FileService;

  public constructor(logger: Logger, fileService: FileService) {
    super(logger, APIPath.FILES);

    this.fileService = fileService;

    this.addRoute({
      path: FilesApiPath.UPLOAD,
      method: 'POST',
      handler: (options) => {
        return this.upload(
          options as APIHandlerOptions<{
            fileBuffer: FileUploadRequestDto;
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /files/upload:
   *    post:
   *      description: Uploads a file
   *      requestBody:
   *        description: File data
   *        required: true
   *        content:
   *          multipart/form-data:
   *            schema:
   *              type: object
   *              properties:
   *                file:
   *                  type: string
   *                  format: binary
   *      security:
   *       - bearerAuth: []
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/File'
   *        401:
   *          description: Unauthorized
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   *              example:
   *                message: "Incorrect credentials."
   *                errorType: "AUTHORIZATION"
   */
  private async upload(
    options: APIHandlerOptions<{
      fileBuffer: FileUploadRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.fileService.create(options.fileBuffer),
    };
  }
}

export { FileController };
