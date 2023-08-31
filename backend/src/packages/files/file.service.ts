import crypto from 'node:crypto';

import { type S3Package } from '#libs/packages/s3/s3.js';
import { type Service } from '#libs/types/types.js';
import { FileEntity } from '#packages/files/file.entity.js';
import { type FileRepository } from '#packages/files/file.repository.js';

import {
  type FileUploadRequestDto,
  type FileUploadResponseDto,
} from './libs/types/types.js';

type FileServiceDependencies = {
  fileRepository: FileRepository;
  s3Package: S3Package;
};

class FileService implements Service {
  private fileRepository: FileRepository;
  private s3Package: S3Package;

  public constructor({ fileRepository, s3Package }: FileServiceDependencies) {
    this.fileRepository = fileRepository;
    this.s3Package = s3Package;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  //TODO: create controller for findById

  public async findById(
    id: number,
  ): Promise<ReturnType<FileEntity['toObject']> | null> {
    const file = await this.fileRepository.findById(id);

    if (!file) {
      return null;
    }

    return file.toObject();
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async create(
    payload: FileUploadRequestDto,
  ): Promise<FileUploadResponseDto> {
    const fileExtensionIndex = 1;

    const fileKey = `${crypto.randomUUID()}.${
      payload.contentType.split('/')[fileExtensionIndex]
    }`;

    await this.s3Package.sendFile({
      fileKey,
      buffer: payload.buffer,
      contentType: payload.contentType,
    });

    const url = this.s3Package.getUrl(fileKey);
    const presignedUrl = await this.s3Package.getPreSignedUrl(fileKey);
    await this.fileRepository.create(
      FileEntity.initializeNew({
        url,
        contentType: payload.contentType,
      }),
    );

    return { url: presignedUrl };
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { FileService };
