import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { groupChatMessage } from '#libs/helpers/helpers.js';
import { type ValueOf } from '#libs/types/types.js';
import { type ChatMessagesGroups } from '#packages/chat-messages/chat-messages.js';
import { type ChatGetAllItemResponseDto } from '#packages/chats/chats.js';

import {
  createChat,
  createMessage,
  deleteChat,
  generateReply,
  getAllChats,
  getCurrentChatMessages,
  updateChatImage,
} from './actions.js';

type State = {
  chats: ChatGetAllItemResponseDto[];
  currentChatMessages: ChatMessagesGroups;
  chatsDataStatus: ValueOf<typeof DataStatus>;
  createChatDataStatus: ValueOf<typeof DataStatus>;
  currentChatMessagesDataStatus: ValueOf<typeof DataStatus>;
  createMessageDataStatus: ValueOf<typeof DataStatus>;
  deleteChatDataStatus: ValueOf<typeof DataStatus>;
  generateReplyDataStatus: ValueOf<typeof DataStatus>;
  updateChatImageStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  chats: [],
  currentChatMessages: {},
  chatsDataStatus: DataStatus.IDLE,
  createChatDataStatus: DataStatus.IDLE,
  currentChatMessagesDataStatus: DataStatus.IDLE,
  createMessageDataStatus: DataStatus.IDLE,
  deleteChatDataStatus: DataStatus.IDLE,
  generateReplyDataStatus: DataStatus.IDLE,
  updateChatImageStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'chat',
  reducers: {
    setCreateMessageDataStatus: (
      state,
      action: PayloadAction<ValueOf<typeof DataStatus>>,
    ) => {
      state.createMessageDataStatus = action.payload;
    },
  },
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
      state.currentChatMessages = groupChatMessage(
        state.currentChatMessages,
        action.payload,
      );
      state.createMessageDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(createMessage.rejected, (state) => {
      state.createMessageDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(deleteChat.pending, (state) => {
      state.deleteChatDataStatus = DataStatus.PENDING;
    });

    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.chats = state.chats.filter((chat) => {
        return chat.id !== action.payload;
      });
      state.deleteChatDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(deleteChat.rejected, (state) => {
      state.deleteChatDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(generateReply.pending, (state) => {
      state.generateReplyDataStatus = DataStatus.PENDING;
    });

    builder.addCase(generateReply.fulfilled, (state, action) => {
      state.currentChatMessages = groupChatMessage(
        state.currentChatMessages,
        action.payload,
      );
      state.generateReplyDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(generateReply.rejected, (state) => {
      state.generateReplyDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(updateChatImage.pending, (state) => {
      state.updateChatImageStatus = DataStatus.PENDING;
    });

    builder.addCase(updateChatImage.fulfilled, (state, action) => {
      state.chats = state.chats.map((chat) => {
        if (chat.id === action.payload.id) {
          return action.payload;
        }

        return chat;
      });
      state.updateChatImageStatus = DataStatus.FULFILLED;
    });

    builder.addCase(updateChatImage.rejected, (state) => {
      state.updateChatImageStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
