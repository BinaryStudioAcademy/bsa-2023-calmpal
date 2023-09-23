import { APIPath } from '#libs/enums/enums';
import { BaseHttpApi } from '#libs/packages/api/api';
import { type HTTP } from '#libs/packages/http/http';
import { type Storage } from '#libs/packages/storage/storage';

import { MeditationApiPath } from './libs/enums/enums';
import { type MeditationEntryGetAllResponseDto } from './libs/types/types';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class MeditationApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.MEDITATION, baseUrl, http, storage });
  }

  public async getAllMeditationEntries(): Promise<MeditationEntryGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(MeditationApiPath.ROOT, {}),
      {
        method: 'GET',
        hasAuth: true,
      },
    );

    return await response.json<MeditationEntryGetAllResponseDto>();
  }
}

export { MeditationApi };
