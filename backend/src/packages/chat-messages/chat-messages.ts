import { logger } from '#libs/packages/logger/logger.js';

import { ChatMessageModel } from './chat-message.model.js';
import { ChatMessageRepository } from './chat-message.repository.js';
import { ChatMessageService } from './chat-message.service.js';
import { ChatMessageController } from './chat-messages.controller.js';

const chatMessageRepository = new ChatMessageRepository(ChatMessageModel);
const chatMessageService = new ChatMessageService(chatMessageRepository);
const chatMessagesController = new ChatMessageController(
  logger,
  chatMessageService,
);
export { chatMessageService };
export { chatMessagesController };
