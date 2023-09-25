import { type ValueOf } from '#libs/types/types.js';

import {
  type OpenAiImageSize,
  type OpenAiResponseFormat,
} from '../enums/enums.js';

type OpenAiImageGenerateRequestDto = {
  prompt: string;
  number?: number;
  size?: ValueOf<typeof OpenAiImageSize>;
  response_format?: ValueOf<typeof OpenAiResponseFormat>;
};

export { type OpenAiImageGenerateRequestDto };
