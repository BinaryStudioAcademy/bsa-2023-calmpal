import { config } from '#libs/packages/config/config';
import { http } from '#libs/packages/http/http';
import { storage } from '#libs/packages/storage/storage';

import { ChatMessagesApi } from './chat-messages-api';

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
} from './libs/types/types';
export { chatMessagesApi };
