import { type MultipartFile } from '@fastify/multipart';
import fp from 'fastify-plugin';

import { type ContentType } from '#libs/enums/enums.js';
import { ControllerHook } from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';
import {
  FileError,
  FileUploadValidationMessage,
} from '#packages/files/files.js';

type Options = {
  extensions: string[];
};

const fileUpload = fp<Options>((fastify, { extensions }, done) => {
  fastify.decorateRequest('fileBuffer', null);

  fastify.addHook(ControllerHook.PRE_VALIDATION, async (request) => {
    if (!request.isMultipart()) {
      return;
    }

    const { file } = request.body as { file: MultipartFile };

    if (file.file.truncated) {
      throw new FileError({
        status: HTTPCode.BAD_REQUEST,
        message: FileUploadValidationMessage.FILE_TOO_LARGE,
      });
    }

    if (!extensions.includes(file.mimetype)) {
      throw new FileError({
        status: HTTPCode.BAD_REQUEST,
        message: FileUploadValidationMessage.INCORRECT_FILE_TYPE,
      });
    }

    const buffer = await file.toBuffer();

    request.fileBuffer = {
      buffer,
      contentType: file.mimetype as ValueOf<typeof ContentType>,
      fileName: file.filename,
    };
  });

  done();
});

export { fileUpload };
