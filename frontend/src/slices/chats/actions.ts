import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '#libs/enums/enums.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type ChatCreateRequestDto,
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
} from '#packages/chats/chats.js';
import { actions as appActions } from '#slices/app/app.js';

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
  ChatCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-chat`, async (payload, { extra }) => {
  const { chatApi } = extra;

  return await chatApi.createChat(payload);
});

const deleteChat = createAsyncThunk<
  ChatGetAllItemResponseDto[],
  number,
  AsyncThunkConfig
>(`${sliceName}/delete-chat`, async (id, { extra, getState, dispatch }) => {
  const { chatApi } = extra;
  await chatApi.deleteChat(id);

  const {
    chats: { chats },
  } = getState();

  dispatch(appActions.navigate(AppRoute.CHATS));

  return chats.filter((chat) => {
    return chat.id !== id;
  });
});

export { createChat, deleteChat, getAllChats };
