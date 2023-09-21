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

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(query: string): Promise<JournalEntryEntity[]> {
    const journalEntries = await this.journalEntryModel
      .query()
      .select()
      .modify((builder) => {
        if (query) {
          void builder.whereILike('title', `%${query}%`);
        }
      })
      .castTo<JournalEntryCommonQueryResponse[]>()
      .execute();

    return journalEntries.map((journalEntry) => {
      return JournalEntryEntity.initialize({
        id: journalEntry.id,
        title: journalEntry.title,
        createdAt: new Date(journalEntry.createdAt),
        updatedAt: new Date(journalEntry.updatedAt),
        text: journalEntry.text,
      });
    });
  }

  public async create(entity: JournalEntryEntity): Promise<JournalEntryEntity> {
    const { title, text } = entity.toNewObject();

    const journalEntry = await this.journalEntryModel
      .query()
      .insertGraph({
        title,
        text,
      } as JournalEntryCreateQueryPayload)
      .castTo<JournalEntryCommonQueryResponse>()
      .execute();

    return JournalEntryEntity.initialize({
      id: journalEntry.id,
      title: journalEntry.title,
      createdAt: new Date(journalEntry.createdAt),
      updatedAt: new Date(journalEntry.updatedAt),
      text: journalEntry.text,
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { JournalEntryRepository };
