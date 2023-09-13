import { type UserToChatResponseDto } from './user-to-chat-response-dto.type.js';

type ChatGetAllItemResponseDto = {
  id: number;
  name: string;
  members: UserToChatResponseDto[];
};

export { type ChatGetAllItemResponseDto };
