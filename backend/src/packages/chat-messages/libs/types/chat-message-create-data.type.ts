import { type ChatMessageCreateRequestDto } from './types.js';

type ChatMessageCreateData = ChatMessageCreateRequestDto & { chatId: number };

export { type ChatMessageCreateData };
