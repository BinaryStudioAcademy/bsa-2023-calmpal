import { createSlice } from '@reduxjs/toolkit';

import { MOCK_MESSAGE } from '#libs/constants/chat-mock-data.constants.js';
import { ChatRole } from '#libs/enums/enums.js';
import { type ChatState } from '#libs/types/types.js';

import { addMessage, newMessage } from './actions.js';
import { handleMessages } from './chat.handler.js';

const FIRST = 0;

const initialState: ChatState = { messages: [MOCK_MESSAGE] };

const { reducer, actions, name } = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMessage.fulfilled, (state, action) => {
      handleMessages({
        state,
        sender: ChatRole.USER,
        message: action.payload,
      });
    });
    builder.addCase(newMessage.fulfilled, (state, action) => {
      handleMessages({
        state,
        sender: action.payload.sender,
        message: action.payload.message.at(FIRST) as string,
      });
    });
  },
});

export { actions, name, reducer };
