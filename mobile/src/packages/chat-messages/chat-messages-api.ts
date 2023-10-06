import { APIPath, ContentType } from '#libs/enums/enums';
import { BaseHttpApi } from '#libs/packages/api/api';
import { type HTTP } from '#libs/packages/http/http';
import { type Storage } from '#libs/packages/storage/storage';

import { ChatsApiPath } from './libs/enums/enum';
import {
  type ChatMessageCreatePayload,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
} from './libs/types/types';

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

  public async createMessage(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.$ID_MESSAGES, {
        id: payload.chatId,
      }),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify({ message: payload.message }),
        hasAuth: true,
      },
    );

    return await response.json<ChatMessageGetAllItemResponseDto>();
  }

  public async generateChatReply(
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
