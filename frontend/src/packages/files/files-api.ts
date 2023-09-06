import { APIPath, type ContentType } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';
import { type ValueOf } from '#libs/types/types.js';

import { FilesApiPath } from './libs/enums/enums.js';
import { type FileUploadResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class FilesApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.FILES, baseUrl, http, storage });
  }

  public async uploadFile(payload: {
    file: File;
    contentType: ValueOf<typeof ContentType>;
  }): Promise<FileUploadResponseDto> {
    const formData = new FormData();
    formData.append('file', payload.file);

    const response = await this.load(
      this.getFullEndpoint(FilesApiPath.UPLOAD, {}),
      {
        method: 'POST',
        contentType: payload.contentType,
        payload: formData,
        hasAuth: true,
      },
    );

    return await response.json<FileUploadResponseDto>();
  }
}

export { FilesApi };
