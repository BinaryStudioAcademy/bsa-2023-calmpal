import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ChatMessage } from '#libs/types/types.js';

import { name } from './chat.slice.js';

type NewMessagePayload = {
  message: ChatMessage;
};

const newMessage = createAsyncThunk<ChatMessage, NewMessagePayload>(
  `${name}/newMessage`,
  (payload: NewMessagePayload) => {
    return payload.message;
  },
);

export { newMessage };
