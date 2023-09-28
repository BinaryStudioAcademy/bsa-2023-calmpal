import { APIPath, ContentType } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';
import {
  type UserDeleteRequestDto,
  type UserDeleteResponseDto,
} from '#packages/users/users.js';

import { UsersApiPath } from '../enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class UsersApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.USERS, baseUrl, http, storage });
  }

  public async deleteUser(
    payload: UserDeleteRequestDto,
  ): Promise<UserDeleteResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.$ID, { id: payload.id.toString() }),
      {
        method: 'DELETE',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<UserDeleteResponseDto>();
  }
}

export { UsersApi };
