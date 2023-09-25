import { APIPath, ContentType } from '#libs/enums/enums';
import { BaseHttpApi } from '#libs/packages/api/api';
import { type HTTP } from '#libs/packages/http/http';
import { type Storage } from '#libs/packages/storage/storage';

import { ChatsApiPath } from './libs/enums/enums';
import {
  type ChatCreateRequestDto,
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
} from './libs/types/types';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class ChatApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.CHATS, baseUrl, http, storage });
  }

  public async getAllChats(): Promise<ChatGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.ROOT, {}),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<ChatGetAllResponseDto>();
  }

  public async createChat(
    payload: ChatCreateRequestDto,
  ): Promise<ChatGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<ChatGetAllItemResponseDto>();
  }

  public async deleteChat(id: number): Promise<boolean> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.$ID, { id: id.toString() }),
      {
        method: 'DELETE',
        hasAuth: true,
      },
    );

    return await response.json<boolean>();
  }
}

export { ChatApi };
