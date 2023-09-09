import { createSlice } from '@reduxjs/toolkit';

import { type ChatGetAllItemResponseDto } from '#packages/chat/chat.js';

type State = {
  chats: ChatGetAllItemResponseDto[];
};

const initialState: State = {
  chats: [],
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'chat',
  reducers: {},
});

export { actions, name, reducer };
