import { APIPath, ContentType } from '#libs/enums/enums';
import { BaseHttpApi } from '#libs/packages/api/api';
import { type HTTP } from '#libs/packages/http/http';
import { type Storage } from '#libs/packages/storage/storage';

import { JournalApiPath } from './libs/enums/enums';
import {
  type JournalEntryDeleteResponseDto,
  type JournalEntryGetAllResponseDto,
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
}

export { JournalApi };
