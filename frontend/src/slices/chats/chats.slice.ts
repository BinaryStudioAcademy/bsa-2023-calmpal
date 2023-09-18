import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';
import { type ChatMessageGetAllItemResponseDto } from '#packages/chat-messages/chat-messages.js';
import { type ChatGetAllItemResponseDto } from '#packages/chats/chats.js';

import {
  createChat,
  createMessage,
  getAllChats,
  getCurrentChatMessages,
} from './actions.js';

type State = {
  chats: ChatGetAllItemResponseDto[];
  currentChatMessages: ChatMessageGetAllItemResponseDto[];
  chatsDataStatus: ValueOf<typeof DataStatus>;
  createChatDataStatus: ValueOf<typeof DataStatus>;
  currentChatMessagesDataStatus: ValueOf<typeof DataStatus>;
  createMessageDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  chats: [],
  currentChatMessages: [],
  chatsDataStatus: DataStatus.IDLE,
  createChatDataStatus: DataStatus.IDLE,
  currentChatMessagesDataStatus: DataStatus.IDLE,
  createMessageDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'chat',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllChats.pending, (state) => {
      state.chatsDataStatus = DataStatus.PENDING;
    });

    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.chats = action.payload.items;
      state.chatsDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(getAllChats.rejected, (state) => {
      state.chatsDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(createChat.pending, (state) => {
      state.createChatDataStatus = DataStatus.PENDING;
    });

    builder.addCase(createChat.fulfilled, (state, action) => {
      state.chats.unshift(action.payload);
      state.createChatDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(createChat.rejected, (state) => {
      state.createChatDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getCurrentChatMessages.pending, (state) => {
      state.currentChatMessagesDataStatus = DataStatus.PENDING;
    });

    builder.addCase(getCurrentChatMessages.fulfilled, (state, action) => {
      state.currentChatMessages = action.payload.items;
      state.currentChatMessagesDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(getCurrentChatMessages.rejected, (state) => {
      state.currentChatMessagesDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(createMessage.pending, (state) => {
      state.createMessageDataStatus = DataStatus.IDLE;
    });

    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.currentChatMessages.push(action.payload);
      state.createMessageDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(createMessage.rejected, (state) => {
      state.createMessageDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
