import { type ContentType } from '#libs/enums/enums.js';
import { type Entity, type ValueOf } from '#libs/types/types.js';

class MeditationEntity implements Entity {
  private id: number | null;

  private name: string;

  private mediaUrl: string;

  private duration: number;

  private contentType: ValueOf<typeof ContentType>;

  private userId: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  public constructor({
    id,
    name,
    mediaUrl,
    duration,
    contentType,
    userId,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    name: string;
    mediaUrl: string;
    duration: number;
    contentType: ValueOf<typeof ContentType>;
    userId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.name = name;
    this.mediaUrl = mediaUrl;
    this.duration = duration;
    this.contentType = contentType;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    name,
    mediaUrl,
    contentType,
    duration,
    userId,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    name: string;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
    duration: number;
    userId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }): MeditationEntity {
    return new MeditationEntity({
      id,
      name,
      mediaUrl,
      contentType,
      duration,
      userId,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    name,
    duration,
    mediaUrl,
    contentType,
    userId,
  }: {
    name: string;
    mediaUrl: string;
    duration: number;
    contentType: ValueOf<typeof ContentType>;
    userId: number | null;
  }): MeditationEntity {
    return new MeditationEntity({
      id: null,
      name,
      mediaUrl,
      contentType,
      duration,
      userId,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    mediaUrl: string;
    duration: number;
    contentType: ValueOf<typeof ContentType>;
    userId: number | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      name: this.name,
      mediaUrl: this.mediaUrl,
      duration: this.duration,
      contentType: this.contentType,
      userId: this.userId,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    name: string;
    mediaUrl: string;
    duration: number;
    contentType: ValueOf<typeof ContentType>;
    userId: number | null;
  } {
    return {
      name: this.name,
      mediaUrl: this.mediaUrl,
      duration: this.duration,
      contentType: this.contentType,
      userId: this.userId,
    };
  }
}

export { MeditationEntity };
