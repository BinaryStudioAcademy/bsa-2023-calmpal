import { config } from '#libs/packages/config/config';
import { http } from '#libs/packages/http/http';
import { storage } from '#libs/packages/storage/storage';

import { JournalApi } from './journal-api';

const journalApi = new JournalApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdatePayloadDto,
} from './libs/types/types';
export { journalApi };
