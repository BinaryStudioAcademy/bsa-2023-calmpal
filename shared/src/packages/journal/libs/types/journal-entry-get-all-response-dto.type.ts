import { type JournalEntryGetAllItemResponseDto } from './journal-entry-get-all-item-response-dto.type.js';

type JournalEntryGetAllResponseDto = {
  items: JournalEntryGetAllItemResponseDto[];
};

export { type JournalEntryGetAllResponseDto };
