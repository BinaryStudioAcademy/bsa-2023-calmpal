import { SortType } from '#libs/enums/enums.js';
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
    const journalEntry = await this.journalEntryModel.query().findById(id);

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

  public async findAllByUserId(
    userId: number,
    query: string,
  ): Promise<JournalEntryEntity[]> {
    const journalEntries = await this.journalEntryModel
      .query()
      .where({ userId })
      .orderBy('updatedAt', SortType.DESC)
      .modify((builder) => {
        if (query) {
          void builder.where('title', 'iLike', `%${query}%`);
        }
      })
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

  public async create(entity: JournalEntryEntity): Promise<JournalEntryEntity> {
    const { title, text, userId } = entity.toNewObject();

    const journalEntry = await this.journalEntryModel
      .query()
      .insertGraph({
        userId,
        title,
        text,
      } as JournalEntryCreateQueryPayload)
      .castTo<JournalEntryCommonQueryResponse>();

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
      .patchAndFetchById(id, { title, text })
      .castTo<JournalEntryCommonQueryResponse>();

    return JournalEntryEntity.initialize({
      id: updatedJournalEntry.id,
      userId: updatedJournalEntry.userId,
      text: updatedJournalEntry.text,
      title: updatedJournalEntry.title,
      createdAt: new Date(updatedJournalEntry.createdAt),
      updatedAt: new Date(updatedJournalEntry.updatedAt),
    });
  }

  public delete(id: number): ReturnType<Repository['delete']> {
    return this.journalEntryModel.query().deleteById(id).execute();
  }
}

export { JournalEntryRepository };
