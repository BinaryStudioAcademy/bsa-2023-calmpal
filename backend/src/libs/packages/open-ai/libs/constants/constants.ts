import { type ValueOf } from '#libs/types/types.js';

import { type OpenAiImageSize } from '../enums/enums.js';

const BASE_OPEN_AI_URL = 'https://api.openai.com/v1/';

const DEFAULT_IMAGE_GENERATE_REQUEST = {
  n: 1,
  size: '512x512' as ValueOf<typeof OpenAiImageSize>,
};

export { BASE_OPEN_AI_URL, DEFAULT_IMAGE_GENERATE_REQUEST };
