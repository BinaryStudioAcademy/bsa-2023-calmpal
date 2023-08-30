import {
  GetObjectCommand,
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { HOUR_IN_SEC } from './libs/constants/constants.js';
import { getUrl } from './libs/helpers/helpers.js';
import { type AWSUploadRequestDto } from './libs/types/types.js';

type AWSServiceDependencies = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
};

class AWSService {
  private region: string;
  private bucketName: string;

  private s3Client: S3Client;

  public constructor({
    region,
    accessKeyId,
    secretAccessKey,
    bucketName,
  }: AWSServiceDependencies) {
    this.region = region;
    this.bucketName = bucketName;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    } as S3ClientConfig);
  }

  public get S3Client(): S3Client {
    return this.s3Client;
  }

  public async sendFile({
    fileKey,
    buffer,
    contentType,
  }: AWSUploadRequestDto): Promise<void> {
    const putObjectCommand = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: buffer,
      ContentType: contentType,
    } as PutObjectCommandInput);

    await this.s3Client.send(putObjectCommand);
  }

  public async getPreSignedUrl(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    const signedUrl: string = await getSignedUrl(this.s3Client, command, {
      expiresIn: HOUR_IN_SEC,
    });

    return signedUrl;
  }

  public getUrl(fileKey: string): string {
    return getUrl('https://{bucket}.s3.{region}.amazonaws.com/{fileKey}', {
      bucket: this.bucketName,
      region: this.region,
      fileKey,
    });
  }
}

export { AWSService };
