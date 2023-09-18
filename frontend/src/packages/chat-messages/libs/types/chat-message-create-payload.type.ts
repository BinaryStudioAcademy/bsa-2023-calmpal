import { type ChatMessageCreateRequestDto } from './types.js';

type ChatMessageCreatePayload = ChatMessageCreateRequestDto & {
  chatId: string;
};

export { type ChatMessageCreatePayload };
