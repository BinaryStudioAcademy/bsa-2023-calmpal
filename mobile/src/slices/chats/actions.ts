import {
  type NavigationProp,
  type ParamListBase,
} from '@react-navigation/native';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ChatScreenName } from '#libs/enums/enums';
import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type ChatMessageCreatePayload,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
} from '#packages/chat-messages/chat-messages';
import {
  type ChatCreateRequestDto,
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
} from '#packages/chats/chats';

import { name as sliceName } from './chats.slice';

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
  { payload: ChatCreateRequestDto; navigation: NavigationProp<ParamListBase> },
  AsyncThunkConfig
>(`${sliceName}/create-chat`, async ({ payload, navigation }, { extra }) => {
  const { chatApi } = extra;

  const chat = await chatApi.createChat(payload);
  navigation.navigate(ChatScreenName.CHAT, { title: chat.name, id: chat.id });

  return chat;
});

const createMessage = createAsyncThunk<
  ChatMessageGetAllItemResponseDto,
  ChatMessageCreatePayload,
  AsyncThunkConfig
>(`${sliceName}/create-chat-message`, async (payload, { extra }) => {
  const { chatMessagesApi } = extra;

  return await chatMessagesApi.createChatMessage(payload);
});

const generateReply = createAsyncThunk<
  ChatMessageGetAllItemResponseDto,
  ChatMessageCreatePayload,
  AsyncThunkConfig
>(`${sliceName}/generate-reply`, async (payload, { extra }) => {
  const { chatMessagesApi } = extra;

  return await chatMessagesApi.generateChatReply(payload);
});

export {
  createChat,
  createMessage,
  generateReply,
  getAllChats,
  getCurrentChatMessages,
};
