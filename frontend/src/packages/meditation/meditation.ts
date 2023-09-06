import { config } from '#libs/packages/config/config.js';
import { http } from '#libs/packages/http/http.js';
import { storage } from '#libs/packages/storage/storage.js';

import { MeditationApi } from './meditation-api.js';

const meditationApi = new MeditationApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { meditationApi };
