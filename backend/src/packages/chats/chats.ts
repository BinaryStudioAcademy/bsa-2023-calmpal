import { logger } from '#libs/packages/logger/logger.js';

import { ChatController } from './chat.controller.js';
import { ChatModel } from './chat.model.js';
import { ChatRepository } from './chat.repository.js';
import { ChatService } from './chat.service.js';

const chatRepository = new ChatRepository(ChatModel);
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(logger, chatService);

export { chatController, chatService };
