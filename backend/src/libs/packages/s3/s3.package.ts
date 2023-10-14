import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';

import { type ContentType } from '~/libs/enums/enums.js';
import { ExceptionMessage } from '~/libs/enums/enums.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { replaceTemplateWithValue } from '~/libs/helpers/helpers.js';
import { type HTTPCode, HTTPError } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

type Constructor = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
};

type UploadFilePayload = {
  fileKey: string;
  buffer: Buffer;
  contentType: ValueOf<typeof ContentType>;
};

class S3 {
  private region: string;

  private bucketName: string;

  private s3Client: S3Client;

  public constructor({
    region,
    accessKeyId,
    secretAccessKey,
    bucketName,
  }: Constructor) {
    this.region = region;
    this.bucketName = bucketName;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  public get S3Client(): S3Client {
    return this.s3Client;
  }

  public async uploadFile({
    fileKey,
    buffer,
    contentType,
  }: UploadFilePayload): Promise<string> {
    try {
      const putObjectCommand = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: buffer,
        ContentType: contentType,
      });

      await this.s3Client.send(putObjectCommand);

      return this.getFileUrl(fileKey);
    } catch (error) {
      this.throwError(error);
    }
  }

  private getFileUrl(fileKey: string): string {
    return replaceTemplateWithValue({
      template: 'https://{bucket}.s3.{region}.amazonaws.com/{fileKey}',
      replacements: {
        bucket: this.bucketName,
        region: this.region,
        fileKey,
      },
    });
  }

  private throwError(error: unknown): never {
    if (error instanceof S3ServiceException) {
      throw new HTTPError({
        message: error.message,
        status: error.$response?.statusCode as ValueOf<typeof HTTPCode>,
      });
    }

    throw new ApplicationError({
      message: ExceptionMessage.FILE_UPLOAD_FAILED,
      cause: error,
    });
  }
}

export { S3 };
