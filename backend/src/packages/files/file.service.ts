import crypto from 'node:crypto';

import {
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';

import { type Service } from '#libs/types/types.js';
import { FileEntity } from '#packages/files/file.entity.js';
import { type FileRepository } from '#packages/files/file.repository.js';

import {
  type FileGetAllResponseDto,
  type FileUploadRequestDto,
  type FileUploadResponseDto,
} from './libs/types/types.js';

type FileServiceDependencies = {
  fileRepository: FileRepository;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
};

class FileService implements Service {
  private fileRepository: FileRepository;
  private region: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  private bucketName: string;

  public constructor({
    fileRepository,
    region,
    accessKeyId,
    secretAccessKey,
    bucketName,
  }: FileServiceDependencies) {
    this.fileRepository = fileRepository;
    this.region = region;
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.bucketName = bucketName;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  //FUTURE TODO: CREATE CONTROLLER FOR findById

  public async findById(
    id: number,
  ): Promise<ReturnType<FileEntity['toObject']> | null> {
    const file = await this.fileRepository.findById(id);

    if (!file) {
      return null;
    }

    return file.toObject();
  }

  //FUTURE TODO: CREATE CONTROLLER FOR findAll

  public async findAll(): Promise<FileGetAllResponseDto> {
    const files = await this.fileRepository.findAll();

    return {
      items: files.map((file) => file.toObject()),
    };
  }

  public async create(
    payload: FileUploadRequestDto,
  ): Promise<FileUploadResponseDto> {
    const s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    } as S3ClientConfig);

    const fileExtensionIndex = 1;

    const fileKey = `${crypto.randomUUID()}.${
      payload.contentType.split('/')[fileExtensionIndex]
    }`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: payload.buffer,
      ContentType: payload.contentType,
    } as PutObjectCommandInput);

    await s3Client.send(putObjectCommand);

    const url = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileKey}`;
    await this.fileRepository.create(
      FileEntity.initializeNew({
        url,
        contentType: payload.contentType,
      }),
    );

    return { url };
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { FileService };
