import { config } from '#libs/packages/config/config.js';

import { httpService } from '../http/http.js';
import { OpenAi } from './open-ai.package.js';

const openAi = new OpenAi(httpService, config.ENV.OPEN_AI.API_KEY);

export { openAi };
export { type OpenAi } from './open-ai.package.js';
