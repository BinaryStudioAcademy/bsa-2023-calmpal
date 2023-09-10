import { ExceptionMessage } from '#libs/enums/enums.js';
import { UsersError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Service } from '#libs/types/types.js';
import { userService } from '#packages/users/users.js';

import { JournalEntryEntity } from './journal-entry.entity.js';
import { type JournalEntryRepository } from './journal-entry.repository.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
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

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async findAllByUserId(
    userId: number,
  ): Promise<JournalEntryGetAllResponseDto> {
    const items = await this.journalEntryRepository.findAllByUserId(userId);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public async create(
    payload: JournalEntryCreateRequestDto,
  ): Promise<JournalEntryGetAllItemResponseDto> {
    const user = await userService.findById(payload.userId);

    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const item = await this.journalEntryRepository.create(
      JournalEntryEntity.initialize({
        id: null,
        userId: payload.userId,
        createdAt: null,
        updatedAt: null,
        title: payload.title,
        text: payload.text,
      }),
    );

    return item.toObject();
  }

  public async update(
    id: number,
    payload: JournalEntryCreateRequestDto,
  ): Promise<JournalEntryGetAllItemResponseDto> {
    const user = await userService.findById(payload.userId);

    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const newJournalEntry = await this.journalEntryRepository.update(
      JournalEntryEntity.initialize({
        id,
        userId: payload.userId,
        createdAt: null,
        updatedAt: null,
        title: payload.title,
        text: payload.text,
      }),
    );

    return newJournalEntry.toObject();
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { JournalEntryService };
