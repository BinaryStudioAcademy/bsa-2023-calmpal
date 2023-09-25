import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
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

const createChat = createAsyncThunk<
  ChatGetAllItemResponseDto,
  ChatCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-chat`, async (payload, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.createChat(payload);
});

const deleteChat = createAsyncThunk<number, number, AsyncThunkConfig>(
  `${sliceName}/delete-chat`,
  async (id, { extra }) => {
    const { chatApi } = extra;
    await chatApi.deleteChat(id);

    return id;
  },
);

export { createChat, deleteChat, getAllChats };
