import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdatePayloadDto,
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
  JournalEntryUpdatePayloadDto,
  AsyncThunkConfig
>(`${sliceName}/update-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.updateJournalEntry(payload);
});

export { createJournalEntry, getAllJournalEntries, updateJournalEntry };
