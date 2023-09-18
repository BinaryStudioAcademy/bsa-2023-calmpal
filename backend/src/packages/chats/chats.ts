import { logger } from '#libs/packages/logger/logger.js';
import { openAi } from '#libs/packages/open-ai/open-ai.js';
import { chatMessageService } from '#packages/chat-messages/chat-messages.js';

import { ChatController } from './chat.controller.js';
import { ChatModel } from './chat.model.js';
import { ChatRepository } from './chat.repository.js';
import { ChatService } from './chat.service.js';
import { ChatbotService } from './chatbot.service.js';
import { UserToChatModel } from './user-to-chat.model.js';

const chatRepository = new ChatRepository(ChatModel, UserToChatModel);
const chatService = new ChatService({ chatRepository, chatMessageService });
const chatController = new ChatController(logger, chatService);

const chatbotService = new ChatbotService({ openAi });

export { chatbotService, chatController, chatService };
