import { logger } from '#libs/packages/logger/logger.js';

import { MeditationController } from './meditation.controller.js';
import { MeditationRepository } from './meditation.repository.js';
import { MeditationService } from './meditation.service.js';
import { MeditationEntriesModel } from './meditation-entries.model.js';
import { MeditationTopicModel } from './meditation-topics.model.js';

const meditationRepository = new MeditationRepository(
  MeditationEntriesModel,
  MeditationTopicModel,
);
const meditationService = new MeditationService(meditationRepository);
const meditationController = new MeditationController(
  logger,
  meditationService,
);

export { meditationController, meditationService };
export {
  type MeditationEntryRequestDto,
  type MeditationEntryResponseDto,
} from './libs/types/types.js';
