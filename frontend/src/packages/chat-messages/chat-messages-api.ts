import { ContentType } from 'shared/build/index.js';

import { APIPath } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

import { ChatsApiPath } from './libs/enums/enum.js';
import {
  type ChatMessageCreatePayload,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class ChatMessagesApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.CHATS, baseUrl, http, storage });
  }

  public async getAllMessagesByChatId(
    chatId: string,
  ): Promise<ChatMessageGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.$ID_MESSAGES, { id: chatId }),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<ChatMessageGetAllResponseDto>();
  }

  public async createChatMessage(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.$ID_MESSAGES, {
        id: payload.chatId,
      }),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          message: payload.message,
        }),
        hasAuth: true,
      },
    );

    return await response.json<ChatMessageGetAllItemResponseDto>();
  }

  public async generateReply(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.$ID_GENERATE_REPLY, {
        id: payload.chatId,
      }),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          message: payload.message,
        }),
        hasAuth: true,
      },
    );

    return await response.json<ChatMessageGetAllItemResponseDto>();
  }
}

export { ChatMessagesApi };
