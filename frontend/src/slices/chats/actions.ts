import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
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

const createChat = createAsyncThunk<
  ChatGetAllItemResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/create-chat`, async (_, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.createChat();
});

export { createChat, getAllChats };
