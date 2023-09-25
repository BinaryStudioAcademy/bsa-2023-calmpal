import { type ChatGetAllItemResponseDto } from 'shared/build/index.js';

type UpdateChatImagePayload = {
  chat: ChatGetAllItemResponseDto;
  imageB64Json: string;
};

export { type UpdateChatImagePayload };
