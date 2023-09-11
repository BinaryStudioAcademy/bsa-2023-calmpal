import { type ContentType } from '#libs/enums/enums.js';
import { type Entity, type ValueOf } from '#libs/types/types.js';

class MeditationEntity implements Entity {
  private id: number | null;

  private mediaUrl: string;

  private contentType: ValueOf<typeof ContentType>;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  public constructor({
    id,
    mediaUrl,
    contentType,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.mediaUrl = mediaUrl;
    this.contentType = contentType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    mediaUrl,
    contentType,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date | null;
    updatedAt: Date | null;
  }): MeditationEntity {
    return new MeditationEntity({
      id,
      mediaUrl,
      contentType,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    mediaUrl,
    contentType,
  }: {
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
  }): MeditationEntity {
    return new MeditationEntity({
      id: null,

      mediaUrl,
      contentType,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      mediaUrl: this.mediaUrl,
      contentType: this.contentType,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
  } {
    return {
      mediaUrl: this.mediaUrl,
      contentType: this.contentType,
    };
  }
}

export { MeditationEntity };
