import { logger } from '#libs/packages/logger/logger.js';
import { openAiService } from '#libs/packages/open-ai/open-ai.js';
import { chatMessageService } from '#packages/chat-messages/chat-messages.js';
import { fileService } from '#packages/files/files.js';

import { ChatController } from './chat.controller.js';
import { ChatModel } from './chat.model.js';
import { ChatRepository } from './chat.repository.js';
import { ChatService } from './chat.service.js';
import { UserToChatModel } from './user-to-chat.model.js';

const chatRepository = new ChatRepository(ChatModel, UserToChatModel);

const chatService = new ChatService({
  chatRepository,
  chatMessageService,
  openAiService,
  fileService,
});
const chatController = new ChatController({
  logger,
  chatService,
});

export { ChatbotService } from '../chat-messages/chatbot.service.js';
export { ChatError } from './libs/exceptions/exceptions.js';
export { chatController, chatService };
