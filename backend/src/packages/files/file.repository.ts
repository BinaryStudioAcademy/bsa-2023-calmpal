import { type Repository } from '#libs/types/types.js';
import { FileEntity } from '#packages/files/file.entity.js';
import { type FileModel } from '#packages/files/file.model.js';

import {
  type FileCommonQueryResponse,
  type FileCreateQueryPayload,
} from './libs/types/types.js';

class FileRepository implements Repository {
  private fileModel: typeof FileModel;

  public constructor(fileModel: typeof FileModel) {
    this.fileModel = fileModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findById(id: number): Promise<FileEntity | null> {
    const file = await this.fileModel
      .query()
      .findById(id)
      .castTo<FileCommonQueryResponse | undefined>()
      .execute();

    if (!file) {
      return null;
    }

    return FileEntity.initialize({
      id: file.id,
      url: file.url,
      content_type: file.content_type,
      createdAt: new Date(file.createdAt),
      updatedAt: new Date(file.updatedAt),
    });
  }

  public async findAll(): Promise<FileEntity[]> {
    const files = await this.fileModel
      .query()
      .select()
      .castTo<FileCommonQueryResponse[]>()
      .execute();

    return files.map((file) => {
      return FileEntity.initialize({
        id: file.id,
        url: file.url,
        content_type: file.content_type,
        createdAt: new Date(file.createdAt),
        updatedAt: new Date(file.updatedAt),
      });
    });
  }

  public async create(entity: FileEntity): Promise<FileEntity> {
    const { url, content_type } = entity.toNewObject();
    const file = await this.fileModel
      .query()
      .insertGraph({
        url,
        content_type,
      } as FileCreateQueryPayload)
      .castTo<FileCommonQueryResponse>()
      .execute();

    return FileEntity.initialize({
      id: file.id,
      url: file.url,
      content_type: file.content_type,
      createdAt: new Date(file.createdAt),
      updatedAt: new Date(file.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { FileRepository };
