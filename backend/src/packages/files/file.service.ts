import crypto from 'node:crypto';

import { ExceptionMessage } from '#libs/enums/enums.js';
import { ApplicationError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type S3 } from '#libs/packages/s3/s3.js';
import { type Service } from '#libs/types/types.js';
import { FileEntity } from '#packages/files/file.entity.js';
import { type FileRepository } from '#packages/files/file.repository.js';

import { FileError } from './libs/exceptions/exceptions.js';
import {
  type FileGetAllItemResponseDto,
  type FileUploadRequestDto,
} from './libs/types/types.js';

type FileServiceDependencies = {
  fileRepository: FileRepository;
  s3: S3;
};

class FileService implements Service {
  private fileRepository: FileRepository;

  private s3: S3;

  public constructor({ fileRepository, s3 }: FileServiceDependencies) {
    this.fileRepository = fileRepository;
    this.s3 = s3;
  }

  public findById(): ReturnType<Service['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async create(
    payload: FileUploadRequestDto,
  ): Promise<FileGetAllItemResponseDto> {
    try {
      const fileKey = `${crypto.randomUUID()}.${payload.fileName}`;

      const url = await this.s3.uploadFile({
        fileKey,
        buffer: payload.buffer,
        contentType: payload.contentType,
      });
      const file = await this.fileRepository.create(
        FileEntity.initializeNew({
          url,
          contentType: payload.contentType,
        }),
      );

      return file.toObject();
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw new FileError({
          message: error.message,
          status: HTTPCode.BAD_REQUEST,
          cause: error,
        });
      }

      throw new FileError({
        message: ExceptionMessage.FILE_UPLOAD_FAILED,
        status: HTTPCode.BAD_REQUEST,
        cause: error,
      });
    }
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { FileService };
