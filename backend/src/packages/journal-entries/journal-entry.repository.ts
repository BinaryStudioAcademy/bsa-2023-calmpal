import { type Repository } from '#libs/types/types.js';
import { type JournalEntryModel } from '#packages/journal-entries/journal-entries.js';
import { JournalEntryEntity } from '#packages/journal-entries/journal-entry.entity.js';

import {
  type JournalEntryCommonQueryResponse,
  type JournalEntryCreateQueryPayload,
} from './libs/types/types.js';

class JournalEntryRepository implements Repository {
  private journalEntryModel: typeof JournalEntryModel;

  public constructor(journalEntryModel: typeof JournalEntryModel) {
    this.journalEntryModel = journalEntryModel;
  }

  public async find(id: number): Promise<JournalEntryEntity | null> {
    const journalEntry = await this.journalEntryModel
      .query()
      .findById(id)
      .execute();

    if (!journalEntry) {
      return null;
    }

    return JournalEntryEntity.initialize({
      id: journalEntry.id,
      userId: journalEntry.userId,
      title: journalEntry.title,
      text: journalEntry.text,
      createdAt: new Date(journalEntry.createdAt),
      updatedAt: new Date(journalEntry.updatedAt),
    });
  }

  public async findAll(): ReturnType<Repository['findAll']> {
    return await Promise.resolve([]);
  }

  public async findAllByUserId(userId: number): Promise<JournalEntryEntity[]> {
    const journalEntries = await this.journalEntryModel
      .query()
      .where('userId', userId)
      .select()
      .castTo<JournalEntryCommonQueryResponse[]>()
      .execute();

    return journalEntries.map((journalEntry) => {
      return JournalEntryEntity.initialize({
        id: journalEntry.id,
        userId: journalEntry.userId,
        title: journalEntry.title,
        createdAt: new Date(journalEntry.createdAt),
        updatedAt: new Date(journalEntry.updatedAt),
        text: journalEntry.text,
      });
    });
  }

  public async findByTitle(
    userId: number,
    title: string,
  ): Promise<JournalEntryEntity | null> {
    const entity = await this.journalEntryModel
      .query()
      .where('userId', userId)
      .andWhere('title', title)
      .first();

    if (!entity) {
      return null;
    }

    return JournalEntryEntity.initialize({
      id: entity.id,
      userId: entity.userId,
      title: entity.title,
      text: entity.text,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
    });
  }

  public async create(entity: JournalEntryEntity): Promise<JournalEntryEntity> {
    const { title, text, userId } = entity.toNewObject();

    const journalEntry = await this.journalEntryModel
      .query()
      .insertGraph({
        userId,
        title,
        text,
      } as JournalEntryCreateQueryPayload)
      .castTo<JournalEntryCommonQueryResponse>()
      .execute();

    return JournalEntryEntity.initialize({
      id: journalEntry.id,
      userId: journalEntry.userId,
      title: journalEntry.title,
      createdAt: new Date(journalEntry.createdAt),
      updatedAt: new Date(journalEntry.updatedAt),
      text: journalEntry.text,
    });
  }

  public async update(entity: JournalEntryEntity): Promise<JournalEntryEntity> {
    const { title, text, id } = entity.toObject();

    const updatedJournalEntry = await this.journalEntryModel
      .query()
      .patchAndFetchById(id, { title, text });

    return JournalEntryEntity.initialize({
      id: updatedJournalEntry.id,
      userId: updatedJournalEntry.userId,
      text: updatedJournalEntry.text,
      title: updatedJournalEntry.title,
      createdAt: new Date(updatedJournalEntry.createdAt),
      updatedAt: new Date(),
    });
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { JournalEntryRepository };
