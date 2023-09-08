import { type Entity } from '#libs/types/types.js';

class JournalEntryEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private title: string;

  private text: string;

  public constructor({
    id,
    title,
    text,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    title: string;
    text: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    title,
    text,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    title: string;
    text: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }): JournalEntryEntity {
    return new JournalEntryEntity({
      id,
      title,
      text,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    title,
    text,
  }: {
    title: string;
    text: string;
  }): JournalEntryEntity {
    return new JournalEntryEntity({
      id: null,
      title,
      text,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    title: string;
    text: string;
  } {
    return {
      title: this.title,
      text: this.text,
    };
  }
}

export { JournalEntryEntity };
