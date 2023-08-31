import { createSlice } from '@reduxjs/toolkit';

import { MOCK_MESSAGE } from '#libs/constants/chat-mock-data.constant.js';
import { FIRST_INDEX, LAST_INDEX } from '#libs/constants/index.constant.js';
import { type ChatMessage, type ChatState } from '#libs/types/types.js';

import { newMessage } from './actions.js';

const initialState: ChatState = { messages: [MOCK_MESSAGE] };

type StateInfo = ChatMessage & {
  state: ChatState;
};

const isSameUserLastMessage = (state: ChatState, sender: string): boolean =>
  state.messages.at(LAST_INDEX)?.sender === sender;

const appendLastMessage = (state: ChatState, message: string): void => {
  const updatedLastMessage = {
    ...state.messages.at(LAST_INDEX),
  } as ChatMessage;
  updatedLastMessage.message.push(message);
  state.messages = [
    ...state.messages.slice(FIRST_INDEX, LAST_INDEX),
    updatedLastMessage,
  ];
};

const addMessageToState = ({ state, id, sender, message }: StateInfo): void => {
  state.messages = [...state.messages, { id, sender, message: message }];
};

const handleMessages = ({ state, id, sender, message }: StateInfo): void => {
  if (isSameUserLastMessage(state, sender)) {
    appendLastMessage(state, message[FIRST_INDEX] as string);
  } else {
    addMessageToState({ state, id, sender, message });
  }
};
const { reducer, actions, name } = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newMessage.fulfilled, (state, action) => {
      handleMessages({
        state,
        id: action.payload.id,
        sender: action.payload.sender,
        message: action.payload.message,
      });
    });
  },
});

export { actions, name, reducer };
