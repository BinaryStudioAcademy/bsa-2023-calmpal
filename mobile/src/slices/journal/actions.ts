import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
import { type JournalEntryGetAllResponseDto } from '#packages/journal/journal';

import { name as sliceName } from './journal.slice';

const getAllJournalEntriers = createAsyncThunk<
  JournalEntryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-journal-entries`, async (_, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.getAllJournalEntriers();
});

export { getAllJournalEntriers };
