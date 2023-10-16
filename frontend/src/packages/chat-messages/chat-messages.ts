import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { ChatMessagesApi } from './chat-messages-api.js';

const chatMessagesApi = new ChatMessagesApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export {
  type ChatMessageCreatePayload,
  type ChatMessageCreateRequestDto,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
  type ChatMessagesGroups,
} from './libs/types/types.js';
export { chatMessagesApi };
