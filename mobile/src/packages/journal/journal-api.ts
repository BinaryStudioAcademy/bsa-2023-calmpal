import { APIPath, ContentType } from '~/libs/enums/enums';
import { BaseHttpApi } from '~/libs/packages/api/api';
import { type HTTP } from '~/libs/packages/http/http';
import { type Storage } from '~/libs/packages/storage/storage';

import { JournalApiPath } from './libs/enums/enums';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryDeleteResponseDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdatePayloadDto,
} from './libs/types/types';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class JournalApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.JOURNAL, baseUrl, http, storage });
  }

  public async getAllJournalEntries(): Promise<JournalEntryGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(JournalApiPath.ROOT, {}),
      {
        method: 'GET',
        hasAuth: true,
      },
    );

    return await response.json<JournalEntryGetAllResponseDto>();
  }

  public async deleteJournalEntry(
    id: number,
  ): Promise<JournalEntryDeleteResponseDto> {
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

  public async create(
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

  public async update(
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
}

export { JournalApi };
