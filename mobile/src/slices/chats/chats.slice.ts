// import { createSlice } from '@reduxjs/toolkit';

// import { DataStatus } from '#libs/enums/enums';
// import { type ValueOf } from '#libs/types/types';
// import { type ChatGetAllItemResponseDto } from '#packages/chats/chats';

// import { createChat, getAllChats } from './actions';

// type State = {
//   chats: ChatGetAllItemResponseDto[];
//   chatsDataStatus: ValueOf<typeof DataStatus>;
//   createChatDataStatus: ValueOf<typeof DataStatus>;
// };

// const initialState: State = {
//   chats: [],
//   chatsDataStatus: DataStatus.IDLE,
//   createChatDataStatus: DataStatus.IDLE,
// };

// const { reducer, actions, name } = createSlice({
//   initialState,
//   name: 'chat',
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(getAllChats.pending, (state) => {
//       state.chatsDataStatus = DataStatus.PENDING;
//     });
//     builder.addCase(getAllChats.fulfilled, (state, action) => {
//       state.chats = action.payload.items;
//       state.chatsDataStatus = DataStatus.FULFILLED;
//     });
//     builder.addCase(getAllChats.rejected, (state) => {
//       state.chatsDataStatus = DataStatus.REJECTED;
//     });

//     builder.addCase(createChat.pending, (state) => {
//       state.createChatDataStatus = DataStatus.PENDING;
//     });
//     builder.addCase(createChat.fulfilled, (state, action) => {
//       state.chats.unshift(action.payload);
//       state.createChatDataStatus = DataStatus.FULFILLED;
//     });
//     builder.addCase(createChat.rejected, (state) => {
//       state.createChatDataStatus = DataStatus.REJECTED;
//     });
//   },
// });

// export { actions, name, reducer };
export {};
