import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIPath } from 'shared/build/index.js';

import { AppRoute } from '#libs/enums/enums.js';
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
  type UpdateChatImageRequestDto,
} from '#packages/chats/chats.js';
import { actions as appActions } from '#slices/app/app.js';

import { name as sliceName } from './chats.slice.js';

const getAllChats = createAsyncThunk<
  ChatGetAllResponseDto,
  string,
  AsyncThunkConfig
>(`${sliceName}/get-all-chats`, async (query, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.getAllChats(query);
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
>(`${sliceName}/create-chat`, async (payload, { extra, dispatch }) => {
  const { chatApi } = extra;
  const chat = await chatApi.createChat(payload);

  dispatch(appActions.navigate(`${APIPath.CHATS}/${chat.id}`));

  return chat;
});

const createMessage = createAsyncThunk<
  ChatMessageGetAllItemResponseDto,
  ChatMessageCreatePayload,
  AsyncThunkConfig
>(`${sliceName}/create-chat-message`, async (payload, { extra, dispatch }) => {
  const { chatMessagesApi } = extra;
  const message = await chatMessagesApi.createChatMessage(payload);

  void dispatch(generateReply(payload));

  return message;
});

const deleteChat = createAsyncThunk<number, number, AsyncThunkConfig>(
  `${sliceName}/delete-chat`,
  async (id, { extra, dispatch }) => {
    const { chatApi } = extra;
    await chatApi.deleteChat(id);

    dispatch(appActions.navigate(AppRoute.CHATS));

    return id;
  },
);

const generateReply = createAsyncThunk<
  ChatMessageGetAllItemResponseDto,
  ChatMessageCreatePayload,
  AsyncThunkConfig
>(`${sliceName}/generate-reply`, async (payload, { extra }) => {
  const { chatMessagesApi } = extra;

  return await chatMessagesApi.generateChatReply(payload);
});

const updateChatImage = createAsyncThunk<
  ChatGetAllItemResponseDto,
  UpdateChatImageRequestDto,
  AsyncThunkConfig
>(`${sliceName}/update-chat-image`, async (payload, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.updateChatImage(payload);
});

export {
  createChat,
  createMessage,
  deleteChat,
  generateReply,
  getAllChats,
  getCurrentChatMessages,
  updateChatImage,
};
