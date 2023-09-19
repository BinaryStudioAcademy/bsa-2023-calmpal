import { logger } from '#libs/packages/logger/logger.js';
import { chatMessageService } from '#packages/chat-messages/chat-messages.js';

import { ChatController } from './chat.controller.js';
import { ChatModel } from './chat.model.js';
import { ChatRepository } from './chat.repository.js';
import { ChatService } from './chat.service.js';

const chatRepository = new ChatRepository(ChatModel);
const chatService = new ChatService({ chatRepository, chatMessageService });
const chatController = new ChatController(logger, chatService);

export { chatController, chatService };
