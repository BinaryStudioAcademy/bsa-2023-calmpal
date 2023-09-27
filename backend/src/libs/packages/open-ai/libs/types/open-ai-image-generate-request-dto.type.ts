import { type ValueOf } from '#libs/types/types.js';

import { type OpenAiImageSize } from '../enums/enums.js';

type OpenAiImageGenerateRequestDto = {
  prompt: string;
  number?: number;
  size?: ValueOf<typeof OpenAiImageSize>;
};

export { type OpenAiImageGenerateRequestDto };
