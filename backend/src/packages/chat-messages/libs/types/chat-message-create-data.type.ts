import { type ChatMessageCreateRequestDto } from './types.js';

type ChatMessageCreateData = ChatMessageCreateRequestDto & {
  chatId: number;
  senderId: number;
};

export { type ChatMessageCreateData };
