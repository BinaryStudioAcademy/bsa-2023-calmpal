import {
  GetObjectCommand,
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { type AWSUploadRequestDto } from './libs/types/types.js';

type AWSServiceDependencies = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
};

class AWSService {
  private region: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  private bucketName: string;

  private s3Client: S3Client;

  public constructor({
    region,
    accessKeyId,
    secretAccessKey,
    bucketName,
  }: AWSServiceDependencies) {
    this.region = region;
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.bucketName = bucketName;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    } as S3ClientConfig);
  }

  public getS3Client(): S3Client {
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

  public async getPreSignedURL(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    const signedUrl: string = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600,
    });

    return signedUrl;
  }

  public getURL(fileKey: string): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileKey}`;
  }
}

export { AWSService };
