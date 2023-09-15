import { type ValueOf } from '#libs/types/types.js';

import { type OpenAiImageSize } from '../enums/enums.js';

const DEFAULT_IMAGE_GENERATE_REQUEST = {
  n: 1,
  size: '512x512' as ValueOf<typeof OpenAiImageSize>,
};

export { DEFAULT_IMAGE_GENERATE_REQUEST };
