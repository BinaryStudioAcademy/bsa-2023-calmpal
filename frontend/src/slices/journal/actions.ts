import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdateRequestDto,
} from '#packages/journal/journal.js';

import { name as sliceName } from './journal.slice.js';

const createJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.createJournalEntry(payload);
});

const getAllJournalEntries = createAsyncThunk<
  JournalEntryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-journal-entries`, async (_, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.getAllJournalEntries();
});

const updateJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryUpdateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/update-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.updateJournalEntry(payload);
});
export { createJournalEntry, getAllJournalEntries, updateJournalEntry };
