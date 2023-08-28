import { createSlice } from '@reduxjs/toolkit';

import { MOCK_MESSAGE } from '#libs/constants/chat-mock-data.constants.js';
import { ChatRole } from '#libs/enums/enums.js';
import { type ChatMessage } from '#libs/types/types.js';

import { addMessage, newMessage } from './actions.js';

const LAST = -1;
const FIRST = 0;

type State = {
  messages: ChatMessage[];
};

const initialState: State = { messages: [MOCK_MESSAGE] };

const { reducer, actions, name } = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMessage.fulfilled, (state, action) => {
      if (
        state.messages.length > FIRST &&
        state.messages.at(LAST)?.sender === ChatRole.USER
      ) {
        const updatedLastMessage = {
          ...state.messages.at(LAST),
        } as ChatMessage;
        updatedLastMessage.message.push(action.payload);

        state.messages = [
          ...state.messages.slice(FIRST, LAST),
          updatedLastMessage,
        ];
      } else {
        state.messages = [
          ...state.messages,
          { sender: ChatRole.USER, message: [action.payload] },
        ];
      }
    });
    builder.addCase(newMessage.fulfilled, (state, action) => {
      if (
        state.messages.length > FIRST &&
        state.messages.at(LAST)?.sender === action.payload.sender
      ) {
        const updatedLastMessage = {
          ...state.messages.at(LAST),
        } as ChatMessage;
        updatedLastMessage.message.push(
          action.payload.message.at(FIRST) as string,
        );

        state.messages = [
          ...state.messages.slice(FIRST, LAST),
          updatedLastMessage,
        ];
      } else {
        state.messages = [
          ...state.messages,
          {
            sender: action.payload.sender,
            message: [action.payload.message.at(FIRST) as string],
          },
        ];
      }
    });
  },
});

export { actions, name, reducer };
