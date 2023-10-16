import { openAiService } from '~/libs/packages/open-ai/open-ai.js';
import { userService } from '~/packages/users/users.js';

import { ChatbotService } from '../chat-messages/chatbot.service.js';
import { ChatMessageModel } from './chat-message.model.js';
import { ChatMessageRepository } from './chat-message.repository.js';
import { ChatMessageService } from './chat-message.service.js';

const chatbotService = new ChatbotService({
  openAiService,
  userService,
});

const chatMessageRepository = new ChatMessageRepository(ChatMessageModel);
const chatMessageService = new ChatMessageService({
  chatMessageRepository,
  chatbotService,
});

export { chatbotService, chatMessageService };
export { type ChatMessageService } from './chat-message.service.js';
export {
  type ChatMessageCreatePayload,
  type ChatMessageCreateRequestDto,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
} from './libs/types/types.js';
