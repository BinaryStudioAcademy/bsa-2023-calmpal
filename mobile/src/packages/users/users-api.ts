import { APIPath } from '#libs/enums/enums';
import { BaseHttpApi } from '#libs/packages/api/api';
import { type HTTP } from '#libs/packages/http/http';
import { type Storage } from '#libs/packages/storage/storage';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class UserApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.USERS, baseUrl, http, storage });
  }
}

export { UserApi };
