import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
  type ChatRequestDto,
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
  ChatRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-chat`, async (payload, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.createChat(payload);
});

export { createChat, getAllChats };