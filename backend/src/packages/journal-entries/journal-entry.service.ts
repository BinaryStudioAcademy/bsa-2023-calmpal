import { type Service } from '#libs/types/types.js';

import { JournalEntryEntity } from './journal-entry.entity.js';
import { type JournalEntryRepository } from './journal-entry.repository.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryCreateResponseDto,
  type JournalEntryGetAllResponseDto,
} from './libs/types/types.js';

class JournalEntryService implements Service {
  private journalEntryRepository: JournalEntryRepository;

  public constructor(journalEntryRepository: JournalEntryRepository) {
    this.journalEntryRepository = journalEntryRepository;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<JournalEntryGetAllResponseDto> {
    const items = await this.journalEntryRepository.findAll();

    return {
      items: items.map((item) => item.toObject()),
    };
  }

  public async create(
    payload: JournalEntryCreateRequestDto,
  ): Promise<JournalEntryCreateResponseDto> {
    const item = await this.journalEntryRepository.create(
      JournalEntryEntity.initialize({
        id: null,
        createdAt: null,
        updatedAt: null,
        title: payload.title,
        text: payload.text,
      }),
    );
    const journalEntry = item.toObject();

    return {
      journalEntry,
    };
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { JournalEntryService };
