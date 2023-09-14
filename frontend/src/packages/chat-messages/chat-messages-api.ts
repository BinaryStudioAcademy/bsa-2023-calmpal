import { APIPath } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

import { ChatsApiPath } from './libs/enums/enum.js';
import { type ChatMessageGetAllResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class ChatMessagesApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.CHATS, baseUrl, http, storage });
  }

  public async getAllMessagesByChatId(): Promise<ChatMessageGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.ROOT, {}),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<ChatMessageGetAllResponseDto>();
  }
}

export { ChatMessagesApi };
