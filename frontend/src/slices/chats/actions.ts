import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type ChatMessageCreatePayload,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
} from '#packages/chat-messages/chat-messages.js';
import {
  type ChatCreateRequestDto,
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
} from '#packages/chats/chats.js';

import { name as sliceName } from './chats.slice.js';

const getAllChats = createAsyncThunk<
  ChatGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-chats`, async (_, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.getAllChats();
});

const getCurrentChatMessages = createAsyncThunk<
  ChatMessageGetAllResponseDto,
  string,
  AsyncThunkConfig
>(`${sliceName}/get-all-current-chat-messages`, async (chatId, { extra }) => {
  const { chatMessagesApi } = extra;

  return await chatMessagesApi.getAllMessagesByChatId(chatId);
});

const createChat = createAsyncThunk<
  ChatGetAllItemResponseDto,
  ChatCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-chat`, async (payload, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.createChat(payload);
});

const createMessage = createAsyncThunk<
  ChatMessageGetAllItemResponseDto,
  ChatMessageCreatePayload,
  AsyncThunkConfig
>(`${sliceName}/create-chat-message`, async (payload, { extra }) => {
  const { chatMessagesApi } = extra;

  return await chatMessagesApi.createChatMessage(payload);
});

export { createChat, createMessage, getAllChats, getCurrentChatMessages };
