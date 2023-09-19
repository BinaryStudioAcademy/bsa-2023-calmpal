import { type ChatEntity } from '#packages/chats/chat.entity.js';

type CreateChatPayload = {
  chatEntity: ChatEntity;
  userId: number;
  message: string;
};

export { type CreateChatPayload };
