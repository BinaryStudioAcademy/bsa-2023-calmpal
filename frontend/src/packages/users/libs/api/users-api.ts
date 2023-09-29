import { APIPath } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

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

  public async deleteUser(id: number): Promise<boolean> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.$ID, { id: id.toString() }),
      {
        method: 'DELETE',
        hasAuth: true,
      },
    );

    return await response.json<boolean>();
  }
}

export { UsersApi };
