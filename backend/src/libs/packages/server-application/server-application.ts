import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { authController } from '~/packages/auth/auth.js';
import { chatController } from '~/packages/chats/chats.js';
import { fileController } from '~/packages/files/files.js';
import { journalEntryController } from '~/packages/journal-entries/journal-entries.js';
import { meditationController } from '~/packages/meditation/meditations.js';
import { subscriptionController } from '~/packages/subscriptions/subscriptions.js';
import { surveyController } from '~/packages/surveys/surveys.js';

import { BaseServerApplication } from './base-server-application.js';
import { BaseServerApplicationApi } from './base-server-application-api.js';

const apiV1 = new BaseServerApplicationApi(
  'v1',
  config,
  ...authController.routes,
  ...surveyController.routes,
  ...fileController.routes,
  ...journalEntryController.routes,
  ...meditationController.routes,
  ...chatController.routes,
  ...subscriptionController.routes,
);
const serverApplication = new BaseServerApplication({
  title: 'CalmPal',
  config,
  logger,
  database,
  apis: [apiV1],
});

export { serverApplication };
export { WHITE_ROUTES } from './libs/constants/constants.js';
export { checkIsWhiteRoute } from './libs/helpers/helpers.js';
export { type ServerApplicationRouteParameters } from './libs/types/types.js';
