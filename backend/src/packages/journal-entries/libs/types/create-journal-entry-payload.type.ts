import { type JournalEntryCreateRequestDto } from './types.js';

type CreateJournalEntryPayload = {
  userId: number;
  body: JournalEntryCreateRequestDto;
};

export { type CreateJournalEntryPayload };
