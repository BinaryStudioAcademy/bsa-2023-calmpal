import { type Entity } from '~/libs/types/types.js';

class JournalEntryEntity implements Entity {
  private id: number | null;

  private userId: number;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private title: string;

  private text: string;

  public constructor({
    id,
    userId,
    title,
    text,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    userId: number;
    title: string;
    text: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    userId,
    title,
    text,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    userId: number;
    title: string;
    text: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }): JournalEntryEntity {
    return new JournalEntryEntity({
      id,
      userId,
      title,
      text,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    userId,
    title,
    text,
  }: {
    userId: number;
    title: string;
    text: string;
  }): JournalEntryEntity {
    return new JournalEntryEntity({
      id: null,
      userId,
      title,
      text,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    userId: number;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      userId: this.userId,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    userId: number;
    title: string;
    text: string;
  } {
    return {
      userId: this.userId,
      title: this.title,
      text: this.text,
    };
  }
}

export { JournalEntryEntity };
