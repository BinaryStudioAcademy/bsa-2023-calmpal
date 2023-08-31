import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ChatMessage } from '#libs/types/types.js';

// type AddMessagePayload = {
//   text: string;
// };

type NewMessagePayload = {
  message: ChatMessage;
};

// const addMessage = createAsyncThunk(
//   'chat/addMessage',
//   (payload: AddMessagePayload) => {
//     return payload.text;
//   },
// );

const newMessage = createAsyncThunk(
  'chat/newMessage',
  (payload: NewMessagePayload) => {
    return payload.message;
  },
);

export { newMessage };
