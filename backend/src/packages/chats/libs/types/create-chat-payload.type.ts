import { type ChatEntity } from '#packages/chats/chat.entity.js';

type CreateChatPayload = {
  chatEntity: ChatEntity;
  members: number[];
};

export { type CreateChatPayload };
