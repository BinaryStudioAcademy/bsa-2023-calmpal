import { config } from '#libs/packages/config/config.js';

import { http } from '../http/http.js';
import { OpenAi } from './open-ai.package.js';

const openAiService = new OpenAi({
  apiKey: config.ENV.OPEN_AI.API_KEY,
  baseUrl: config.ENV.OPEN_AI.BASE_URL,
  http,
});

export { openAiService };
export { type OpenAi } from './open-ai.package.js';
