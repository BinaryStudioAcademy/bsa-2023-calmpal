import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';
import { type ChatGetAllItemResponseDto } from '#packages/chats/chats.js';

import { getAllChats } from './actions.js';

type State = {
  chats: ChatGetAllItemResponseDto[];
  chatsDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  chats: [],
  chatsDataStatus: DataStatus.IDLE,
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
  },
});

export { actions, name, reducer };
