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
>(`${sliceName}/create-chat-message`, async (payload, { extra }) => {
  const { chatMessagesApi } = extra;

  return await chatMessagesApi.createChatMessage(payload);
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

export {
  createChat,
  createMessage,
  deleteChat,
  getAllChats,
  getCurrentChatMessages,
};
