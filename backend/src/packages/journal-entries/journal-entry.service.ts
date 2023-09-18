import { ExceptionMessage } from '#libs/enums/enums.js';
import { JournalError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Service } from '#libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

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

  public async findAll(): Promise<JournalEntryGetAllResponseDto> {
    const items = await this.journalEntryRepository.findAll();

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public async create(
    payload: JournalEntryCreateRequestDto,
  ): Promise<JournalEntryGetAllItemResponseDto> {
    const item = await this.journalEntryRepository.create(
      JournalEntryEntity.initializeNew({
        title: payload.title,
        text: payload.text,
      }),
    );

    return item.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public async delete(
    id: number,
    user: UserAuthResponseDto,
  ): ReturnType<Service['delete']> {
    // const journal = await this.find(); //TODO find(id)
    const journal = { id: 1, userId: 32 };
    if (journal.userId !== user.id) {
      throw new JournalError({
        status: HTTPCode.BAD_REQUEST,
        message: ExceptionMessage.INCORRECT_CREDENTIALS,
      });
    }

    return Boolean(await this.journalEntryRepository.delete(id));
  }
}

export { JournalEntryService };
