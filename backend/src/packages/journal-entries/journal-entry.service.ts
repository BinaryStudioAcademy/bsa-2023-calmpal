import { ExceptionMessage } from '#libs/enums/enums.js';
import { UsersError } from '#libs/exceptions/exceptions.js';
import { sanitizeInput } from '#libs/helpers/helpers.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Service } from '#libs/types/types.js';
import { userService } from '#packages/users/users.js';

import { JournalEntryEntity } from './journal-entry.entity.js';
import { type JournalEntryRepository } from './journal-entry.repository.js';
import {
  type CreateJournalEntryPayload,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdateRequestDto,
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

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public async create({
    body,
    userId,
  }: CreateJournalEntryPayload): Promise<JournalEntryGetAllItemResponseDto> {
    const user = await userService.findById(userId);

    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const item = await this.journalEntryRepository.create(
      JournalEntryEntity.initializeNew({
        userId,
        title: sanitizeInput(body.title),
        text: sanitizeInput(body.text),
      }),
    );

    return item.toObject();
  }

  public async update({
    id,
    userId,
    body,
  }: JournalEntryUpdateRequestDto): Promise<JournalEntryGetAllItemResponseDto> {
    const user = await userService.findById(userId as number);

    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const newJournalEntry = await this.journalEntryRepository.update(
      JournalEntryEntity.initialize({
        id,
        userId: userId as number,
        createdAt: null,
        updatedAt: null,
        title: sanitizeInput(body.title),
        text: sanitizeInput(body.text),
      }),
    );

    return newJournalEntry.toObject();
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { JournalEntryService };
