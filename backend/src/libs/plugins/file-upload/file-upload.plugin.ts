import { type MultipartFile } from '@fastify/multipart';
import fp from 'fastify-plugin';

import { ExceptionMessage } from '#libs/enums/enums.js';
import { FileError } from '#libs/exceptions/exceptions.js';
import { ControllerHook } from '#libs/packages/controller/controller.js';

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
      return;
    }

    if (!extensions.includes(file.mimetype)) {
      throw new FileError({
        message: ExceptionMessage.INCORRECT_FILE_TYPE,
      });
    }

    const buffer = await file.toBuffer();

    request.fileBuffer = { buffer, contentType: file.mimetype };
  });

  done();
});

export { fileUpload };
