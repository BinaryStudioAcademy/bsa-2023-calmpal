import { APIPath } from '#libs/enums/enums';
import { BaseHttpApi } from '#libs/packages/api/api';
import { type HTTP } from '#libs/packages/http/http';
import { type Storage } from '#libs/packages/storage/storage';

// import { ChatsApiPath } from './libs/enums/enums';
// import {
//   type ChatGetAllItemResponseDto,
//   type ChatGetAllResponseDto,
//   type ChatRequestDto,
// } from './libs/types/types';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class ChatApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.CHATS, baseUrl, http, storage });
  }

  // public async getAllChats(): Promise<ChatGetAllResponseDto> {
  //   const response = await this.load(
  //     this.getFullEndpoint(ChatsApiPath.ROOT, {}),
  //     { method: 'GET', hasAuth: true },
  //   );

  //   return await response.json<ChatGetAllResponseDto>();
  // }

  // public async createChat(
  //   payload: ChatRequestDto,
  // ): Promise<ChatGetAllItemResponseDto> {
  //   const response = await this.load(
  //     this.getFullEndpoint(ChatsApiPath.ROOT, {}),
  //     {
  //       method: 'POST',
  //       contentType: ContentType.JSON,
  //       payload: JSON.stringify(payload),
  //       hasAuth: true,
  //     },
  //   );

  // return await response.json<ChatGetAllItemResponseDto>();
  // }
}

export { ChatApi };
