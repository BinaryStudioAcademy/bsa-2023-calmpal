import { logger } from '#libs/packages/logger/logger.js';
import { fileService } from '#packages/files/files.js';

import { MeditationController } from './meditation.controller.js';
import { MeditationRepository } from './meditation.repository.js';
import { MeditationService } from './meditation.service.js';
import { MeditationEntriesModel } from './meditation-entries.model.js';

const meditationRepository = new MeditationRepository(MeditationEntriesModel);
const meditationService = new MeditationService(
  meditationRepository,
  fileService,
);
const meditationController = new MeditationController(
  logger,
  meditationService,
);

export { meditationController, meditationService };
export {
  type MeditationEntryCreateRequestDto as MeditationEntryCreateFormDataDto,
  type MeditationEntryCreateResponseDto,
} from './libs/types/types.js';
