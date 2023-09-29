import { type ChatGetAllItemResponseDto } from 'shared/build/index.js';

type UpdateChatDataPayload = {
  chat: ChatGetAllItemResponseDto;
  url: string;
  name: string;
};

export { type UpdateChatDataPayload };
