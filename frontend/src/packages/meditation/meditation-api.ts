import { APIPath } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

import { MeditationApiPath } from './libs/enums/enums.js';
import { type MeditationEntryCreateResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class MeditationApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.MEDITATION, baseUrl, http, storage });
  }

  public async createMeditationEntry(
    file: File,
  ): Promise<MeditationEntryCreateResponseDto> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.load(
      this.getFullEndpoint(MeditationApiPath.ROOT, {}),
      {
        method: 'POST',
        payload: formData,
        hasAuth: true,
      },
    );

    return await response.json<MeditationEntryCreateResponseDto>();
  }
}

export { MeditationApi };
