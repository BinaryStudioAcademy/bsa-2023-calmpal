import { createAsyncThunk } from '@reduxjs/toolkit';

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
  type UpdateChatDataRequestDto,
} from '#packages/chats/chats.js';
import { actions as appActions } from '#slices/app/app.js';

import { name as sliceName } from './chats.slice.js';

const getAllChats = createAsyncThunk<
  ChatGetAllResponseDto,
  string,
  AsyncThunkConfig
>(`${sliceName}/get-all-chats`, async (query, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.getAll(query);
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
  const chat = await chatApi.create(payload);

  dispatch(
    appActions.navigate(AppRoute.CHATS_$ID.replace(':id', chat.id.toString())),
  );

  void dispatch(
    generateReply({ message: payload.message, chatId: chat.id.toString() }),
  );
  void dispatch(
    updateChatData({ message: payload.message, id: chat.id.toString() }),
  );

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
    await chatApi.delete(id);

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

  return await chatMessagesApi.generateReply(payload);
});

const updateChatData = createAsyncThunk<
  ChatGetAllItemResponseDto,
  UpdateChatDataRequestDto,
  AsyncThunkConfig
>(`${sliceName}/update-chat-data`, async (payload, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.updateChatData(payload);
});

export {
  createChat,
  createMessage,
  deleteChat,
  generateReply,
  getAllChats,
  getCurrentChatMessages,
  updateChatData,
};
