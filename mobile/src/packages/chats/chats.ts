import { config } from '#libs/packages/config/config';
import { http } from '#libs/packages/http/http';
import { storage } from '#libs/packages/storage/storage';

import { ChatApi } from './chats-api';

const chatApi = new ChatApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export {
  type ChatCreateRequestDto,
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
} from './libs/types/types';
export { chatApi };
