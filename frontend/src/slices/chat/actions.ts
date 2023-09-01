import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ChatMessage } from '#libs/types/types.js';

type NewMessagePayload = {
  message: ChatMessage;
};

const newMessage = createAsyncThunk(
  'chat/newMessage',
  (payload: NewMessagePayload) => {
    return payload.message;
  },
);

export { newMessage };
