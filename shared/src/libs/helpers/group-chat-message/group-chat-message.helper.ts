import {
  type ChatMessageGetAllItemResponseDto,
  type ChatMessagesGroups,
} from '#packages/chat-messages/chat-messages.js';

const groupChatMessage = (
  group: ChatMessagesGroups,
  chatMessage: ChatMessageGetAllItemResponseDto,
): ChatMessagesGroups => {
  const date = new Date(chatMessage.createdAt).toDateString();
  (group[date] = group[date] ?? []).push(chatMessage);

  return group;
};

export { groupChatMessage };
