import { type ChatMessageCreateRequestDto } from './types.js';

type ChatMessageCreatePayload = ChatMessageCreateRequestDto & {
  chatId: number;
  senderId: number;
};

export { type ChatMessageCreatePayload };
