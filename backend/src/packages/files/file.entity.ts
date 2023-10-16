import { type ContentType } from '~/libs/enums/enums.js';
import { type Entity, type ValueOf } from '~/libs/types/types.js';

class FileEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private url: string;

  private contentType: ValueOf<typeof ContentType>;

  private constructor({
    id,
    url,
    contentType,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    url: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.url = url;
    this.contentType = contentType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    url,
    contentType,
    createdAt,
    updatedAt,
  }: {
    id: number;
    url: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date;
    updatedAt: Date;
  }): FileEntity {
    return new FileEntity({
      id,
      url,
      contentType,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    url,
    contentType,
  }: {
    url: string;
    contentType: ValueOf<typeof ContentType>;
  }): FileEntity {
    return new FileEntity({
      id: null,
      url,
      contentType,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    url: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      url: this.url,
      contentType: this.contentType,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    url: string;
    contentType: ValueOf<typeof ContentType>;
  } {
    return {
      url: this.url,
      contentType: this.contentType,
    };
  }
}

export { FileEntity };
