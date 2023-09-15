import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';

import { name as sliceName } from './meditation.slice';

const initPlayer = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
  `${sliceName}/meditation`,
  (_, { extra }) => {
    const { player } = extra;

    void player.startPlayer();
  },
);

export { initPlayer };
