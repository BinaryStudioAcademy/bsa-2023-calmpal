import { APIPath, ContentType } from '#libs/enums/enums.js';
import { getUrlWithQueryString } from '#libs/helpers/helpers.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

import { ChatsApiPath } from './libs/enums/enums.js';
import {
  type ChatCreateRequestDto,
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
  type UpdateChatImageRequestDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class ChatApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.CHATS, baseUrl, http, storage });
  }

  public async getAll(query: string): Promise<ChatGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(
        getUrlWithQueryString(ChatsApiPath.ROOT, { query }),
        {},
      ),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<ChatGetAllResponseDto>();
  }

  public async create(
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

  public async delete(id: number): Promise<boolean> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.$ID, { id: id.toString() }),
      {
        method: 'DELETE',
        hasAuth: true,
      },
    );

    return await response.json<boolean>();
  }

  public async updateChatImage({
    id,
  }: UpdateChatImageRequestDto): Promise<ChatGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.$ID, { id }),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        payload: JSON.stringify({ id }),
        hasAuth: true,
      },
    );

    return await response.json<ChatGetAllItemResponseDto>();
  }
}

export { ChatApi };
