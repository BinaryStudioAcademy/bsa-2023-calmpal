import { createSlice } from '@reduxjs/toolkit';

import {
  FIRST_INDEX,
  LAST_INDEX,
  MOCK_MESSAGE,
} from '#libs/constants/constants.js';
import {
  type ChatMessage,
  type ChatState,
  type Message,
} from '#libs/types/types.js';

import { newMessage } from './actions.js';

const initialState: ChatState = { messages: [MOCK_MESSAGE] };

type StateInfo = ChatMessage & {
  state: ChatState;
};

const isSameUserLastMessage = (state: ChatState, sender: string): boolean => {
  return state.messages.at(LAST_INDEX)?.sender === sender;
};

const appendLastMessage = (state: ChatState, message: Message): void => {
  const updatedLastMessage = {
    ...state.messages.at(LAST_INDEX),
  } as ChatMessage;
  updatedLastMessage.messages.push(message);
  state.messages = [
    ...state.messages.slice(FIRST_INDEX, LAST_INDEX),
    updatedLastMessage,
  ];
};

const addMessageToState = ({
  state,
  id,
  sender,
  messages,
}: StateInfo): void => {
  state.messages = [...state.messages, { id, sender, messages }];
};

const handleMessages = ({ state, id, sender, messages }: StateInfo): void => {
  if (isSameUserLastMessage(state, sender)) {
    messages[FIRST_INDEX] && appendLastMessage(state, messages[FIRST_INDEX]);
  } else {
    addMessageToState({ state, id, sender, messages });
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
        messages: action.payload.messages,
      });
    });
  },
});

export { actions, name, reducer };
