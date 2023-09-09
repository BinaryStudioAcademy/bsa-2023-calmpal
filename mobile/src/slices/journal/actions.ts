import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
} from '#packages/journal/journal';

import { name as sliceName } from './journal.slice';

const createJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.createJournalEntry(payload);
});

const getAllJournalEntriers = createAsyncThunk<
  JournalEntryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-journal-entries`, async (_, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.getAllJournalEntriers();
});

export { createJournalEntry, getAllJournalEntriers };
