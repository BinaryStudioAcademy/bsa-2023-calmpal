import { APIPath } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

import { FilesApiPath } from './libs/enums/enums.js';
import { type FileGetAllItemResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class FilesApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.FILES, baseUrl, http, storage });
  }

  public async uploadFile(file: File): Promise<FileGetAllItemResponseDto> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.load(
      this.getFullEndpoint(FilesApiPath.UPLOAD, {}),
      {
        method: 'POST',
        payload: formData,
        hasAuth: true,
      },
    );

    return await response.json<FileGetAllItemResponseDto>();
  }
}

export { FilesApi };
