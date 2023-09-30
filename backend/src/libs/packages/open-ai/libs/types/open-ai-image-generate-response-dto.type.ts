import { type ValueOf } from '#libs/types/types.js';

import { type OpenAiResponseFormat } from '../enums/enums.js';

type OpenAiImageGenerateResponseDto = {
  created: number;
  data: { [key in ValueOf<typeof OpenAiResponseFormat>]?: string }[];
};

export { type OpenAiImageGenerateResponseDto };
