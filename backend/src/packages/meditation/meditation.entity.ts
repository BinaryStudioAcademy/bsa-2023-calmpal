import { type Entity } from '#libs/types/types.js';

class MeditationEntity implements Entity {
  private id: number | null;

  private topicName: string;

  private audioUrl: string;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  public constructor({
    id,
    topicName,
    audioUrl,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    topicName: string;
    audioUrl: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.topicName = topicName;
    this.audioUrl = audioUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    topicName,
    audioUrl,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    topicName: string;
    audioUrl: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }): MeditationEntity {
    return new MeditationEntity({
      id,
      topicName,
      audioUrl,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    topicName,
    audioUrl,
  }: {
    topicName: string;
    audioUrl: string;
  }): MeditationEntity {
    return new MeditationEntity({
      id: null,
      topicName,
      audioUrl,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    topicName: string;
    audioUrl: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      topicName: this.topicName,
      audioUrl: this.audioUrl,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    topicName: string;
    audioUrl: string;
  } {
    return {
      topicName: this.topicName,
      audioUrl: this.audioUrl,
    };
  }
}

export { MeditationEntity };
