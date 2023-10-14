import { type Repository } from '~/libs/types/types.js';
import { FileEntity } from '~/packages/files/file.entity.js';
import { type FileModel } from '~/packages/files/file.model.js';

import {
  type FileCommonQueryResponse,
  type FileCreateQueryPayload,
} from './libs/types/types.js';

class FileRepository implements Repository {
  private fileModel: typeof FileModel;

  public constructor(fileModel: typeof FileModel) {
    this.fileModel = fileModel;
  }

  public async findById(id: number): Promise<FileEntity | null> {
    const file = await this.fileModel
      .query()
      .findById(id)
      .castTo<FileCommonQueryResponse | undefined>();

    if (!file) {
      return null;
    }

    return FileEntity.initialize({
      id: file.id,
      url: file.url,
      contentType: file.contentType,
      createdAt: new Date(file.createdAt),
      updatedAt: new Date(file.updatedAt),
    });
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
  }

  public async create(entity: FileEntity): Promise<FileEntity> {
    const { url, contentType } = entity.toNewObject();
    const file = await this.fileModel
      .query()
      .insertGraph({
        url,
        contentType,
      } as FileCreateQueryPayload)
      .castTo<FileCommonQueryResponse>();

    return FileEntity.initialize({
      id: file.id,
      url: file.url,
      contentType: file.contentType,
      createdAt: new Date(file.createdAt),
      updatedAt: new Date(file.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    const DELETED_COUNT = 0;

    return Promise.resolve(DELETED_COUNT);
  }
}

export { FileRepository };
