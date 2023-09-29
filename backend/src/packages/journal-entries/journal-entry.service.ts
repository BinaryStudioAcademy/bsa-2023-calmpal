import { ExceptionMessage } from '#libs/enums/enums.js';
import { JournalError } from '#libs/exceptions/exceptions.js';
import { sanitizeInput } from '#libs/helpers/helpers.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Service } from '#libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import { JournalEntryEntity } from './journal-entry.entity.js';
import { type JournalEntryRepository } from './journal-entry.repository.js';
import {
  DEFAULT_NOTE_TEXT,
  NOTE_SANITIZER_OPTIONS,
} from './libs/constants/constants.js';
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

  public async find(id: number): Promise<JournalEntryGetAllItemResponseDto> {
    const journalEntry = await this.journalEntryRepository.find(id);

    if (!journalEntry) {
      throw new JournalError({
        message: ExceptionMessage.NOTE_NOT_FOUND,
      });
    }

    return journalEntry.toObject();
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async findAllByUserId(
    userId: number,
    query: string,
  ): Promise<JournalEntryGetAllResponseDto> {
    const items = await this.journalEntryRepository.findAllByUserId(
      userId,
      query,
    );

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
    const item = await this.journalEntryRepository.create(
      JournalEntryEntity.initializeNew({
        userId,
        title: sanitizeInput(body.title, NOTE_SANITIZER_OPTIONS),
        text: body.text
          ? sanitizeInput(body.text, NOTE_SANITIZER_OPTIONS)
          : DEFAULT_NOTE_TEXT,
      }),
    );

    return item.toObject();
  }

  public async update({
    id,
    userId,
    title,
    text,
  }: JournalEntryUpdateRequestDto): Promise<JournalEntryGetAllItemResponseDto> {
    if (!Number(id)) {
      throw new JournalError({
        status: HTTPCode.BAD_REQUEST,
        message: ExceptionMessage.JOURNAL_NOT_FOUND,
      });
    }

    const item = await this.journalEntryRepository.update(
      JournalEntryEntity.initialize({
        id,
        userId,
        createdAt: null,
        updatedAt: null,
        title: sanitizeInput(title, NOTE_SANITIZER_OPTIONS),
        text: text
          ? sanitizeInput(text, NOTE_SANITIZER_OPTIONS)
          : DEFAULT_NOTE_TEXT,
      }),
    );

    return item.toObject();
  }

  public async delete(payload: {
    id: number;
    user: UserAuthResponseDto;
  }): ReturnType<Service['delete']> {
    if (!Number(payload.id)) {
      throw new JournalError({
        status: HTTPCode.BAD_REQUEST,
        message: ExceptionMessage.JOURNAL_NOT_FOUND,
      });
    }

    const journal = await this.find(payload.id);
    if (journal.userId !== payload.user.id) {
      throw new JournalError({
        status: HTTPCode.BAD_REQUEST,
        message: ExceptionMessage.INCORRECT_CREDENTIALS,
      });
    }

    const deletedCount = await this.journalEntryRepository.delete(payload.id);

    return Boolean(deletedCount);
  }
}

export { JournalEntryService };
