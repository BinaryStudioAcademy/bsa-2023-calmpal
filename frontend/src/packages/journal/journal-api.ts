import { APIPath, ContentType } from '#libs/enums/enums.js';
import { getUrlWithQueryString } from '#libs/helpers/helpers.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

import { JournalApiPath } from './libs/enums/enums.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryDeleteResponseDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdatePayloadDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class JournalApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.JOURNAL, baseUrl, http, storage });
  }

  public async getAllEntries(
    query: string,
  ): Promise<JournalEntryGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(
        getUrlWithQueryString(JournalApiPath.ROOT, { query }),
        {},
      ),
      {
        method: 'GET',
        hasAuth: true,
      },
    );

    return await response.json<JournalEntryGetAllResponseDto>();
  }

  public async createEntry(
    payload: JournalEntryCreateRequestDto,
  ): Promise<JournalEntryGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(JournalApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<JournalEntryGetAllItemResponseDto>();
  }

  public async updateEntry(
    payload: JournalEntryUpdatePayloadDto,
  ): Promise<JournalEntryGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(JournalApiPath.$ID, {
        id: payload.id.toString(),
      }),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        payload: JSON.stringify({ title: payload.title, text: payload.text }),
        hasAuth: true,
      },
    );

    return await response.json<JournalEntryGetAllItemResponseDto>();
  }

  public async deleteEntry(id: number): Promise<JournalEntryDeleteResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(JournalApiPath.$ID, { id: `${id}` }),
      {
        method: 'DELETE',
        contentType: ContentType.JSON,
        payload: JSON.stringify({}),
        hasAuth: true,
      },
    );

    return await response.json<JournalEntryDeleteResponseDto>();
  }
}

export { JournalApi };
