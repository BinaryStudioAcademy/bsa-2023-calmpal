import { config } from '#libs/packages/config/config.js';
import { http } from '#libs/packages/http/http.js';
import { storage } from '#libs/packages/storage/storage.js';

import { UsersApi } from './users-api.js';

const usersApi = new UsersApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { usersApi };
