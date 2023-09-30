import { type UserToChatQueryResponse } from './user-to-chat-query-response.type.js';

type ChatCommonQueryResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: UserToChatQueryResponse[];
  imageUrl: string | null;
};

export { type ChatCommonQueryResponse };
