import { config } from '#libs/packages/config/config.js';
import { http } from '#libs/packages/http/http.js';
import { storage } from '#libs/packages/storage/storage.js';

import { JournalApi } from './journal-api.js';

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
} from './libs/types/types.js';
export { journalApi };
