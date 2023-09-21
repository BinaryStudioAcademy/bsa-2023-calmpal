import { httpService } from '#libs/packages/http/http.js';
import { logger } from '#libs/packages/logger/logger.js';
import { openAi } from '#libs/packages/open-ai/open-ai.js';
import { s3 } from '#libs/packages/s3/s3.js';
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
  s3Service: s3,
  openAiService: openAi,
  httpService,
  fileService,
});
const chatController = new ChatController({
  logger,
  chatService,
});

export { ChatbotService } from '../chat-messages/chatbot.service.js';
export { chatController, chatService };
