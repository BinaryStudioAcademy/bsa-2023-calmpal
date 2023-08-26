import { type Entity } from '#libs/types/types.js';

class FileEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private url: string;

  private content_type: string;

  private constructor({
    id,
    url,
    content_type,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    url: string;
    content_type: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.url = url;
    this.content_type = content_type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    url,
    content_type,
    createdAt,
    updatedAt,
  }: {
    id: number;
    url: string;
    content_type: string;
    createdAt: Date;
    updatedAt: Date;
  }): FileEntity {
    return new FileEntity({
      id,
      url,
      content_type,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    url,
    content_type,
  }: {
    url: string;
    content_type: string;
  }): FileEntity {
    return new FileEntity({
      id: null,
      url,
      content_type,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    url: string;
    content_type: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      url: this.url,
      content_type: this.content_type,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    url: string;
    content_type: string;
  } {
    return {
      url: this.url,
      content_type: this.content_type,
    };
  }
}

export { FileEntity };
