import { type ValueOf } from '#libs/types/value-of.type.js';

import { type OpenAiImageSize } from '../enums/open-ai-image-size.enum.js';

type OpenAiImageGenerateRequestDto = {
  prompt: string;
  n?: number;
  size?: ValueOf<typeof OpenAiImageSize>;
};

export { type OpenAiImageGenerateRequestDto };
