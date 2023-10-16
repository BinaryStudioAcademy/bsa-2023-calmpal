import { type ValueOf } from '~/libs/types/types.js';

import { type OpenAiRoleKey } from '../enums/enums.js';

type OpenAiMessageGenerateRequestDto = {
  role: ValueOf<typeof OpenAiRoleKey>;
  content: string;
};

export { type OpenAiMessageGenerateRequestDto };
