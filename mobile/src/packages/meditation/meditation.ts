import { config } from '~/libs/packages/config/config';
import { http } from '~/libs/packages/http/http';
import { storage } from '~/libs/packages/storage/storage';

import { MeditationApi } from './meditation-api';

const meditationApi = new MeditationApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { meditationApi };
export { MeditationApiPath } from './libs/enums/enums';
export {
  type MeditationEntryCreateForm,
  type MeditationEntryCreateRequestDto,
  type MeditationEntryCreateResponseDto,
  type MeditationEntryGetAllItemResponseDto,
  type MeditationEntryGetAllResponseDto,
} from './libs/types/types';
export { createMeditationEntryFormValidationSchema } from './libs/validation-schemas/validation-schemas';
