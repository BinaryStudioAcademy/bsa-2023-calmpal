import { type ChatGetAllItemResponseDto } from 'shared/build/index.js';

type UpdateChatImagePayload = {
  chat: ChatGetAllItemResponseDto;
  url: string;
};

export { type UpdateChatImagePayload };
