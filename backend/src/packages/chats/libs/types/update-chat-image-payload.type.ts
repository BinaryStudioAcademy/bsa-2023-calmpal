import { type ChatGetAllItemResponseDto } from 'shared/build/index.js';

type UpdateChatImagePayload = {
  chat: ChatGetAllItemResponseDto;
  imageUrl: string;
};

export { type UpdateChatImagePayload };
