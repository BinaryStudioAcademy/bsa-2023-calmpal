import { type ContentType } from '#libs/enums/enums.js';
import { type Entity, type ValueOf } from '#libs/types/types.js';

class MeditationEntity implements Entity {
  private id: number | null;

  private topicName: string;

  private mediaUrl: string;

  private contentType: ValueOf<typeof ContentType>;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  public constructor({
    id,
    topicName,
    mediaUrl,
    contentType,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    topicName: string;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.topicName = topicName;
    this.mediaUrl = mediaUrl;
    this.contentType = contentType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    topicName,
    mediaUrl,
    contentType,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    topicName: string;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date | null;
    updatedAt: Date | null;
  }): MeditationEntity {
    return new MeditationEntity({
      id,
      topicName,
      mediaUrl,
      contentType,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    topicName,
    mediaUrl,
    contentType,
  }: {
    topicName: string;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
  }): MeditationEntity {
    return new MeditationEntity({
      id: null,
      topicName,
      mediaUrl,
      contentType,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    topicName: string;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      topicName: this.topicName,
      mediaUrl: this.mediaUrl,
      contentType: this.contentType,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    topicName: string;
    mediaUrl: string;
    contentType: ValueOf<typeof ContentType>;
  } {
    return {
      topicName: this.topicName,
      mediaUrl: this.mediaUrl,
      contentType: this.contentType,
    };
  }
}

export { MeditationEntity };
