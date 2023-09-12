import { ExceptionMessage } from '#libs/enums/enums.js';
import { UsersError } from '#libs/exceptions/exceptions.js';
import { sanitizeInput } from '#libs/helpers/helpers.js';
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

  public async find(
    id: number,
  ): Promise<JournalEntryGetAllItemResponseDto | null> {
    const journalEntry = await this.journalEntryRepository.find(id);

    if (!journalEntry) {
      return null;
    }

    return journalEntry.toObject();
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async findAllByUserId(
    userId: number,
  ): Promise<JournalEntryGetAllResponseDto> {
    const items = await this.journalEntryRepository.findAllByUserId(userId);

    const sortedItems = items
      .map((item) => {
        return item.toObject();
      })
      .sort((previous, next) => {
        const datePrevious = previous.updatedAt.getTime();
        const dateNext = next.updatedAt.getTime();

        return dateNext - datePrevious;
      });

    return {
      items: sortedItems,
    };
  }

  public async create(
    payload: JournalEntryCreateRequestDto,
    userId: number,
  ): Promise<JournalEntryGetAllItemResponseDto> {
    const user = await userService.findById(userId);

    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const item = await this.journalEntryRepository.create(
      JournalEntryEntity.initialize({
        id: null,
        userId,
        createdAt: null,
        updatedAt: null,
        title: sanitizeInput(payload.title),
        text: sanitizeInput(payload.text),
      }),
    );

    return item.toObject();
  }

  public async update(
    id: number,
    userId: number,
    payload: JournalEntryCreateRequestDto,
  ): Promise<JournalEntryGetAllItemResponseDto> {
    const user = await userService.findById(userId);

    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const newJournalEntry = await this.journalEntryRepository.update(
      JournalEntryEntity.initialize({
        id,
        userId,
        createdAt: null,
        updatedAt: null,
        title: sanitizeInput(payload.title),
        text: sanitizeInput(payload.text),
      }),
    );

    return newJournalEntry.toObject();
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { JournalEntryService };
