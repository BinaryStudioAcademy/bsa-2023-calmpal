import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
} from '#packages/journal/journal.js';

import { name as sliceName } from './journal.slice.js';

const createJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;
  const { journalEntry } = await journalApi.createJournalEntry(payload);

  return journalEntry;
});

const getAllJournalEntries = createAsyncThunk<
  JournalEntryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-journal-entries`, async (_, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.getAllJournalEntries();
});

export { createJournalEntry, getAllJournalEntries };
